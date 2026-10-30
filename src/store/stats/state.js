export default {
  loading: false, // true while usage data is being loaded
  error: null, // an error
  data: null, // UsageData of the current user (see utils/statsUsageData.js), null until loaded
  periodDays: 0 // 0 = since the first recorded use; otherwise the last N days (7, 14 or 30)
}
