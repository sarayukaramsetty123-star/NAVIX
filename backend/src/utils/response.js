export function success(res, data, statusCode = 200, extra = {}) {
  return res.status(statusCode).json({ success: true, ...extra, data });
}
