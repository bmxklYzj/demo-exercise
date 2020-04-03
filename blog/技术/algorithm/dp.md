# dp 动态规划

case 1：最长上升子序列

https://leetcode-cn.com/problems/longest-increasing-subsequence/

```js
// 时间复杂度O(n^2)
/**
 * @param {number[]} nums
 * @return {number}
 */
// dp[i] 表示 nums[i] 的最长递增子序列的长度。dp[i] = max(dp[i]) + 1
var lengthOfLIS = function(nums) {
  const dp = new Array(nums.length).fill(1);
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  console.log(dp.toString());
  return !nums.length ? 0 : Math.max.apply(null, dp);
};
```
