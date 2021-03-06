---
id: setup
title: Setup
sidebar_label: Setup
---

:::note

NgVacuum is officially compatible with Angular versions 7 through 10.

:::


NgVacuum uses [OmniMock](https://github.com/hmil/omnimock) and [shallow-render](https://github.com/getsaf/shallow-render) to mock service and component dependencies. You must install all three packages separately.

## Angular 10

Use shallow-render version 10.

```
yarn add -D ng-vacuum shallow-render@10 omnimock
```

## Angular 9

Use shallow-render version 9.

```
yarn add -D ng-vacuum shallow-render@9 omnimock
```

## Angular 7 & 8

Use shallow-render version 8.

```
yarn add -D ng-vacuum shallow-render@8 omnimock
```
