# 测试优先级列表

## 项目概述

TianGong LCA Next 是一个生命周期评估(LCA)数据管理平台。基于当前测试覆盖率分析（总体覆盖率：11.83%），以下是按优先级排序的测试需求清单。

---

## 🔴 P0 - 最高优先级（核心业务逻辑）

### 1. **Processes（流程）模块**

**当前覆盖率**: 15.98% (Statements) | **目标**: 70%+

**原因**:

- Processes 是 LCA 的核心概念，是系统最关键的业务模块
- API 覆盖率仅 3.03%，存在高风险
- util.ts 虽然覆盖率 100%，但需要更多边界场景测试

**需要测试的功能**:

```
tests/unit/services/processes/
├── api.test.ts (新建)
│   ├── createProcess() - 创建流程
│   ├── updateProcess() - 更新流程
│   ├── deleteProcess() - 删除流程
│   ├── getProcessDetail() - 获取流程详情
│   ├── getProcessTableAll() - 分页查询
│   ├── getProcessExchange() - 获取交换数据
│   └── process_hybrid_search() - 混合搜索
├── util.test.ts (已存在，需增强)
│   ├── genProcessJsonOrdered() - 边界情况
│   ├── genProcessFromData() - 数据转换异常处理
│   ├── genProcessExchangeTableData() - 空数据处理
│   └── genProcessName() - 多语言处理
└── integration.test.ts (新建)
    └── 完整的流程 CRUD 集成测试
```

---

### 2. **Flows（流）模块**

**当前覆盖率**: 20.06% (Statements) | **目标**: 70%+

**原因**:

- Flow 是 LCA 中物质和能量流动的核心数据结构
- API 覆盖率仅 3.52%，风险极高
- util.ts 已有 100% 覆盖，但 API 层急需补充

**需要测试的功能**:

```
tests/unit/services/flows/
├── api.test.ts (新建)
│   ├── createFlows() - 创建流
│   ├── updateFlows() - 更新流
│   ├── deleteFlows() - 删除流
│   ├── getFlowDetail() - 获取详情
│   ├── getFlowTableAll() - 列表查询
│   ├── flow_hybrid_search() - 混合搜索
│   ├── getFlowTablePgroongaSearch() - 全文搜索
│   └── getFlowStateCodeByIdsAndVersions() - 状态查询
└── util.test.ts (已存在，覆盖良好)
```

---

### 3. **LifeCycle Models（生命周期模型）模块**

**当前覆盖率**: 54.91% (Statements) | **目标**: 75%+

**原因**:

- 这是系统的核心建模功能
- util_calculate.ts 有 82.38% 覆盖率，但仍有复杂计算逻辑未覆盖
- API 层仅 4.73% 覆盖率，存在重大风险

**需要测试的功能**:

```
tests/unit/services/lifeCycleModels/
├── api.test.ts (新建)
│   ├── createLifeCycleModel() - 创建模型
│   ├── updateLifeCycleModel() - 更新模型
│   ├── getLifeCycleModelDetail() - 获取详情
│   ├── getLifeCyclesByIds() - 批量查询
│   └── deleteLifeCycleModel() - 删除模型
├── util_calculate.test.ts (已存在，需增强)
│   ├── genLifeCycleModelProcesses() - 复杂计算场景
│   ├── 边界条件测试（空数据、循环依赖等）
│   └── 性能测试（大规模数据计算）
└── util.test.ts (已存在，覆盖良好)
```

---

## 🟠 P1 - 高优先级（关键支持功能）

### 4. **Reviews（审查）模块**

**当前覆盖率**: 8.24% | **目标**: 60%+

**原因**:

- 数据质量控制的关键环节
- 涉及工作流状态管理
- 多人协作场景复杂

**需要测试的功能**:

```
tests/unit/services/reviews/
├── api.test.ts (新建)
│   ├── addReviewsApi() - 添加审查
│   ├── updateReviewApi() - 更新审查
│   ├── getReviewsDetail() - 获取审查详情
│   ├── getReviewsTableData() - 审查列表
│   └── getReviewerIdsApi() - 获取审查者
└── workflow.test.ts (新建)
    └── 审查工作流集成测试
```

---

### 5. **General Utils（通用工具）模块**

**当前覆盖率**: 42.57% | **目标**: 80%+

**原因**:

- 被所有模块广泛使用的基础工具函数
- 高复用性意味着 bug 影响面大
- 已有一定覆盖，但仍有重要函数未测试

**需要测试的功能**:

```
tests/unit/services/general/
├── util.test.ts (已存在，需增强)
│   ├── getUnitData() - 单位数据处理
│   ├── getRuleVerification() - 规则验证
│   ├── classificationToString() - 分类转换
│   ├── genClassificationZH() - 中文分类生成
│   ├── jsonToList() - JSON 转列表
│   └── getLangText() - 多语言文本提取
└── api.test.ts (已存在，需增强)
    ├── exportDataApi() - 数据导出
    ├── getDataDetail() - 获取数据详情
    ├── getRefData() - 获取引用数据
    └── updateStateCodeApi() - 状态更新
```

---

### 6. **Unit Groups（单位组）模块**

**当前覆盖率**: 13.48% | **目标**: 65%+

**原因**:

- 单位转换是 LCA 计算的基础
- util.ts 已有 95.23% 覆盖，但 API 层仅 4.66%

**需要测试的功能**:

```
tests/unit/services/unitgroups/
├── api.test.ts (新建)
│   ├── createUnitGroup() - 创建单位组
│   ├── updateUnitGroup() - 更新单位组
│   ├── getUnitGroupDetail() - 获取详情
│   ├── getReferenceUnit() - 获取参考单位
│   ├── getReferenceUnits() - 批量获取参考单位
│   └── unitgroup_hybrid_search() - 搜索功能
└── util.test.ts (已存在，覆盖良好)
```

---

### 7. **Flow Properties（流属性）模块**

**当前覆盖率**: 6.97% | **目标**: 65%+

**原因**:

- 流属性定义了流的物理化学特性
- API 覆盖率仅 5.45%

**需要测试的功能**:

```
tests/unit/services/flowproperties/
├── api.test.ts (新建)
│   ├── createFlowproperties() - 创建流属性
│   ├── updateFlowproperties() - 更新流属性
│   ├── getReferenceUnitGroup() - 获取参考单位组
│   ├── getReferenceUnitGroups() - 批量获取
│   └── flowproperty_hybrid_search() - 搜索功能
└── util.test.ts (需增强)
    └── genFlowpropertyJsonOrdered() - 数据排序
```

---

## 🟡 P2 - 中优先级（辅助功能）

### 8. **Contacts（联系人）模块**

**当前覆盖率**: 0% | **目标**: 60%+

**需要测试的功能**:

```
tests/unit/services/contacts/
├── api.test.ts (新建)
│   ├── createContact() - 创建联系人
│   ├── updateContact() - 更新联系人
│   ├── getContactTableAll() - 查询列表
│   └── deleteContact() - 删除联系人
└── util.test.ts (新建)
    ├── genContactJsonOrdered()
    └── genContactFromData()
```

---

### 9. **Sources（来源）模块**

**当前覆盖率**: 8.97% | **目标**: 60%+

**需要测试的功能**:

```
tests/unit/services/sources/
├── api.test.ts (新建)
│   ├── createSource() - 创建来源
│   ├── updateSource() - 更新来源
│   ├── getSourceDetail() - 获取详情
│   ├── getSourcesByIdsAndVersions() - 批量查询
│   └── source_hybrid_search() - 搜索功能
└── util.test.ts (已存在，覆盖良好)
```

---

### 10. **Teams（团队）模块**

**当前覆盖率**: 4.71% | **目标**: 55%+

**需要测试的功能**:

```
tests/unit/services/teams/
├── api.test.ts (新建)
│   ├── getTeamMessageApi() - 获取团队信息
│   ├── createTeam() - 创建团队
│   ├── updateTeam() - 更新团队
│   ├── addTeamMember() - 添加成员
│   └── removeTeamMember() - 移除成员
└── permissions.test.ts (新建)
    └── 团队权限测试
```

---

### 11. **Comments（评论）模块**

**当前覆盖率**: 8.16% | **目标**: 60%+

**需要测试的功能**:

```
tests/unit/services/comments/
├── api.test.ts (新建)
│   ├── getPendingComment() - 获取待处理评论
│   ├── getReviewedComment() - 获取已审查评论
│   ├── addComment() - 添加评论
│   └── updateComment() - 更新评论
└── util.test.ts (新建)
    └── 评论数据转换工具
```

---

### 12. **Users（用户）模块**

**当前覆盖率**: 10.81% | **目标**: 60%+

**需要测试的功能**:

```
tests/unit/services/users/
└── api.test.ts (新建)
    ├── getUserId() - 获取用户 ID
    ├── getUsersByIds() - 批量获取用户
    ├── getUserInfo() - 获取用户信息
    └── updateUserProfile() - 更新用户资料
```

---

### 13. **Roles（角色）模块**

**当前覆盖率**: 4.11% | **目标**: 55%+

**需要测试的功能**:

```
tests/unit/services/roles/
└── api.test.ts (新建)
    ├── getUserTeamId() - 获取用户团队 ID
    ├── checkUserRole() - 检查用户角色
    └── updateUserRole() - 更新用户角色
```

---

## 🟢 P3 - 低优先级（UI 组件和页面）

### 14. **关键组件测试**

**当前覆盖率**: 部分组件已测试 | **目标**: 新增关键组件测试

**需要测试的组件**:

```
tests/unit/components/
├── LangTextItem.test.tsx (新建)
│   └── 多语言文本显示组件
├── LevelTextItem.test.tsx (新建)
│   └── 级别文本显示组件
├── LocationTextItem.test.tsx (新建)
│   └── 位置文本显示组件
├── TableFilter.test.tsx (新建)
│   └── 表格过滤组件
├── Validator.test.tsx (新建)
│   └── 表单验证组件
├── ReferenceData.test.tsx (新建)
│   └── 引用数据选择器
├── AISuggestion.test.tsx (新建)
│   └── AI 建议组件
└── AllVersions.test.tsx (新建)
    └── 版本管理组件
```

---

### 15. **页面级集成测试**

**当前优先级**: 较低

**建议**:

```
tests/integration/pages/ (新建目录)
├── Processes.integration.test.tsx
├── Flows.integration.test.tsx
├── LifeCycleModels.integration.test.tsx
└── Review.integration.test.tsx
```

---

## 📊 测试策略建议

### 短期目标（1-2 周）

1. ✅ **完成 P0 级别**所有测试（Processes, Flows, LifeCycle Models）
2. 将核心模块的覆盖率提升到 **60%+**
3. 确保所有 API 的 CRUD 操作都有基本测试

### 中期目标（3-4 周）

1. ✅ **完成 P1 级别**所有测试（Reviews, General Utils, Unit Groups, Flow Properties）
2. 将整体覆盖率提升到 **40%+**
3. 添加更多边界条件和异常处理测试

### 长期目标（5-8 周）

1. ✅ **完成 P2 级别**测试（Contacts, Sources, Teams, Comments, Users, Roles）
2. 将整体覆盖率提升到 **50%+**
3. 添加关键组件测试（P3）
4. 建立集成测试框架

---

## 🎯 关键指标

### 当前状态

- **总体覆盖率**: 11.83%
- **通过测试**: 371 个
- **测试文件**: 19 个

### 目标状态（8 周后）

- **总体覆盖率**: 50%+
- **核心模块覆盖率**: 70%+
- **通过测试**: 800+ 个
- **测试文件**: 50+ 个

---

## 📝 测试编写规范

### 1. 文件命名

- API 测试: `api.test.ts`
- 工具函数测试: `util.test.ts`
- 集成测试: `integration.test.ts`
- 组件测试: `ComponentName.test.tsx`

### 2. 测试结构

```typescript
describe('模块名称', () => {
  describe('函数名称', () => {
    it('应该在正常情况下工作', () => {
      // Arrange
      // Act
      // Assert
    });

    it('应该处理边界情况', () => {
      // ...
    });

    it('应该处理错误情况', () => {
      // ...
    });
  });
});
```

### 3. Mock 策略

- 使用 `tests/mocks/` 中的统一 mock
- API 调用必须 mock
- 数据库操作必须 mock
- 第三方服务必须 mock

### 4. 测试数据

- 使用 `tests/helpers/factories.ts` 创建测试数据
- 避免硬编码测试数据
- 确保测试数据的可维护性

---

## 🔧 工具和命令

### 运行测试

```bash
# 运行所有测试
npm test

# 运行特定测试文件
npm test -- processes/api.test.ts

# 运行覆盖率报告
npm run test:coverage

# 监听模式
npm run jest -- --watch

# 更新快照
npm run test:update
```

### 检查代码质量

```bash
# Lint 检查
npm run lint

# 自动修复
npm run lint:fix

# TypeScript 类型检查
npm run tsc
```

---

## 📚 参考资源

1. **项目文档**:
   - [测试 README](./README.md)
   - [测试提示](./PROMPT.md)

2. **测试框架**:
   - [Jest 文档](https://jestjs.io/)
   - [React Testing Library](https://testing-library.com/react)

3. **最佳实践**:
   - 遵循 AAA 模式（Arrange-Act-Assert）
   - 每个测试只测试一个功能点
   - 测试命名清晰描述测试内容
   - 避免测试实现细节，关注行为

---

## 📅 更新日志

- **2025-10-04**: 初始版本创建，基于当前 11.83% 覆盖率分析
