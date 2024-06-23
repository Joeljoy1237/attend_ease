export const roles = {
  adminRole: "admin",
  studentRole: "student",
  teacherRole: "teacher",
};

export const successResponse = (data = {}) => {
  const currentTime = new Date();
  const currentHour = currentTime.getUTCHours() + 5; // Adjust for GMT+5
  const currentMinutes = currentTime.getUTCMinutes() + 30; // Adjust for GMT+30

  let greeting;

  // Determine the appropriate greeting based on the adjusted time
  if (currentHour < 12 || (currentHour === 12 && currentMinutes < 30)) {
    greeting = "Good Morning";
  } else if (currentHour < 18 || (currentHour === 18 && currentMinutes < 30)) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  const res = {
    greeting,
    hasError: false,
    resCode: data.code,
    status: "SUCCESS",
    ...data,
    timestamp: currentTime.toISOString(),
    apiVersion: "V1",
    dev: "MidNitCode Innovations",
  };

  // if (data?.description) {
  //     res.description = data?.description
  // }
  return res;
};

export const customError = (data = {}) => {
    const currentTime = new Date();
    const currentHour = currentTime.getUTCHours() + 5; // Adjust for GMT+5
    const currentMinutes = currentTime.getUTCMinutes() + 30; // Adjust for GMT+30

    let greeting;

    // Determine the appropriate greeting based on the adjusted time
    if (currentHour < 12 || (currentHour === 12 && currentMinutes < 30)) {
        greeting = "Good Morning";
    } else if (currentHour < 18 || (currentHour === 18 && currentMinutes < 30)) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    const errorObject = {
        greeting,
        resCode: data?.resCode || "UNKNOWN_ERROR_CODE",
        status: "FAILURE",
        hasError: true,
        message: data?.message || "An unknown error occurred.",
        ...data,
        timestamp: currentTime.toISOString(),
        apiVersion: "V2",
        dev: "MidNitCode Innovations",
    };

    // Conditionally include the 'description' parameter if it has a value
    if (data?.description) {
        errorObject.description = data.description;
    }

    return errorObject;
}

export const resMessages = {
    invalidUserNameOrPasswordMessage: "Invalid username or password!",
    accessDeniedMessage: "Access Denied",
    userNotfoundMessage: "User not found",
    reqestedResourceDoesnotExistsMessage: "Requested resourse does not exists",
    internalServerErrorMessage: "Internal server error. Please try again!",
    AccountLockedMessage: 'Account is locked.',
    AuthSuccessMessage: "Authentication successful",
    userAlreadyExistsMessage: "Username already exists. Choose a different username.",
    emailAlreadyExistsMessage: "Email already exists. Choose a different email.",
    createdSuccessMessage: "Created successfully",
    tokenNotFoundMessage: "Token not found",
    unAuthorizedAccessMessage: "Unauthorized access",
    sessionExpiredMessage: "Your session has expired",
    authFailedMessage: "Authentication failed",
    rateLimitMessage: "Too many requests. Please try after some time",
    passwordResetMessage: "Password reset successfully"
}

export function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}