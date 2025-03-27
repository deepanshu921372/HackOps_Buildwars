from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# Initialize YOLO model
model = YOLO('yolov8n.pt')  # This will automatically download the model

@app.route('/api/analyze-waste', methods=['POST'])
def analyze_waste():
    try:
        # Get image from request
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
            
        file = request.files['image']
        img_bytes = file.read()
        img = Image.open(io.BytesIO(img_bytes))
        
        # Run inference
        results = model(img)[0]
        print("Inference results:", results)
        
        # Get class names and boxes
        boxes = results.boxes
        
        if len(boxes) > 0:
            # Get the prediction with highest confidence
            best_box = boxes[boxes.conf.argmax()]
            class_id = int(best_box.cls)
            confidence = float(best_box.conf)
            
            # For demonstration, we'll categorize based on COCO classes
            waste_categories = {
                0: "Recyclable",    # person -> example mapping
                1: "Electronic",    # bicycle
                2: "Metal",         # car
                # Add more mappings as needed
            }
            
            detected_class = results.names[class_id]
            category = waste_categories.get(class_id, "General Waste")
            
            response_data = {
                'detected_class': detected_class,
                'category': category,
                'confidence': confidence,
                'is_diy_usable': category in ["Recyclable", "Paper", "Plastic"],
                'total_points': calculate_points(category)
            }
            
            print("Sending response:", response_data)
            return jsonify(response_data)
        else:
            return jsonify({
                'error': 'No objects detected in the image'
            }), 400
            
    except Exception as e:
        print(f"Error processing image: {str(e)}")
        return jsonify({
            'error': str(e)
        }), 500

def calculate_points(category):
    points_mapping = {
        "Recyclable": 10,
        "Electronic": 7,
        "Metal": 8,
        "Paper": 5,
        "Plastic": 6,
        "General Waste": 3
    }
    return points_mapping.get(category, 5)

if __name__ == '__main__':
    print("Starting server...")
    app.run(host='0.0.0.0', port=5002, debug=True)