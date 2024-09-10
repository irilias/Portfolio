
const isDevelopment = import.meta.env.DEV;

export const log = (...args) => {
  if (isDevelopment) {
    console.log(...args);
  }
};

export const error = (...args) => {
  if (isDevelopment) {
    console.error(...args);
  } else {
    // todo: send errors to a monitoring service
    // todo: sendToMonitoringService(...args);
  }
};
