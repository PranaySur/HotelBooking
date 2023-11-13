// Define a named export for the 'createError' function, making it accessible in other modules.
export const createError = (status, message) => {
    // Create a new JavaScript Error object.
    const error = new Error();

    // Set the 'status' property of the error object to the provided 'status' parameter.
    error.status = status;

    // Set the 'message' property of the error object to the provided 'message' parameter.
    error.message = message;

    // Return the custom error object with the specified 'status' and 'message'.
    return error;
};