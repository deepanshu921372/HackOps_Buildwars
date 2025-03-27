// client/src/utils/validation.js

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidEmail = (email) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
  };
  
  /**
   * Validates phone number (10 digits)
   * @param {string} phone - Phone number to validate
   * @returns {boolean} True if valid, false otherwise
   */
  export const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(String(phone));
  };
  
  /**
   * Validates password strength
   * @param {string} password - Password to validate
   * @returns {object} Validation result with isValid flag and message
   */
  export const validatePassword = (password) => {
    if (!password || password.length < 6) {
      return {
        isValid: false,
        message: 'Password must be at least 6 characters long'
      };
    }
    
    // Additional strength checks could be added here
    // For example: require uppercase, lowercase, numbers, special chars
    
    return {
      isValid: true,
      message: ''
    };
  };
  
  /**
   * Validates the login form data
   * @param {object} data - Form data with email/phone and password
   * @returns {object} Validation errors object
   */
  export const validateLoginForm = (data) => {
    const errors = {};
    
    // Check if either email or phone is provided
    if (!data.email && !data.phone) {
      errors.auth = 'Please provide either email or phone number';
    }
    
    // Validate email if provided
    if (data.email && !isValidEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Validate phone if provided
    if (data.phone && !isValidPhone(data.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
    
    // Validate password
    if (!data.password) {
      errors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(data.password);
      if (!passwordValidation.isValid) {
        errors.password = passwordValidation.message;
      }
    }
    
    return errors;
  };
  
  /**
   * Validates the signup form data
   * @param {object} data - Form data with name, email, phone, password, and confirmPassword
   * @returns {object} Validation errors object
   */
  export const validateSignupForm = (data) => {
    const errors = {};
    
    // Validate name
    if (!data.name || data.name.trim() === '') {
      errors.name = 'Name is required';
    }
    
    // Validate email
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Validate phone
    if (!data.phone) {
      errors.phone = 'Phone number is required';
    } else if (!isValidPhone(data.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
    
    // Validate password
    if (!data.password) {
      errors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(data.password);
      if (!passwordValidation.isValid) {
        errors.password = passwordValidation.message;
      }
    }
    
    // Validate password confirmation
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    return errors;
  };
  
  /**
   * Validates image data
   * @param {string} imageData - Base64 encoded image data
   * @returns {boolean} True if valid, false otherwise
   */
  export const isValidImageData = (imageData) => {
    if (!imageData) return false;
    
    // Basic check if it's a base64 encoded image
    const isBase64 = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/.test(imageData);
    
    return isBase64;
  };