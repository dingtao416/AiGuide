---
title: 强化学习
category: 机器学习
tag:
  - ML
  - 强化学习
---

# 强化学习

## 定义

**强化学习（Reinforcement Learning，RL）** 是让智能体通过与环境交互，学习最优策略以最大化累积奖励的学习范式。

## 核心概念

```
智能体(Agent) ←→ 环境(Environment)
   ↓ 动作(Action)      ↓
   →  状态(State) + 奖励(Reward)
```

- **状态（State）**：环境的当前情况
- **动作（Action）**：智能体可采取的行动
- **奖励（Reward）**：动作的即时反馈
- **策略（Policy）**：状态到动作的映射

## 主要算法

| 算法 | 类型 | 特点 |
|------|------|------|
| Q-Learning | 值函数 | 经典算法 |
| DQN | 深度RL | 神经网络估计Q值 |
| Policy Gradient | 策略梯度 | 直接优化策略 |
| PPO | 策略梯度 | 稳定高效 |
| A3C | Actor-Critic | 异步训练 |

## 应用场景

- 游戏AI（AlphaGo、Atari）
- 机器人控制
- 推荐系统
- 自动驾驶

## 下一步

- [线性回归](./linear-regression.md)
- [决策树](./decision-tree.md)
