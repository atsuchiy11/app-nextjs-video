## Architecture

![architecture](https://px-ad-img.s3.ap-northeast-1.amazonaws.com/sys-architecture.png)

<br>

## API

[Prime Studio API](https://prime-x-co-ltd.github.io/api-prime-stream/)

<br>

## Deployment

[Verel](https://vercel.com/)

<br>

## Inspection

[Sentry](https://sentry.io/organizations/prime-x-developer/issues/?project=5994573)

<br>

## Types

Show side menu.

<br>

## Document Tree

```bash

├── atoms
    # common components
│   ├── LightTooltip.tsx
│   ├── Link.tsx
│   ├── Message.tsx
│   ├── Notification.tsx
│   ├── ProgressBar.tsx
│   ├── RichEditor.tsx
│   ├── Spinner.tsx
│   ├── StatusCard.tsx
│   ├── StatusChip.tsx
│   ├── TableActionButton.tsx
│   ├── TableColumnWithChip.tsx
│   ├── Tips.tsx
│   ├── UserConfig.tsx
│   └── VideoChip.tsx
├── components
│   ├── ManageTable.tsx
│   ├── admin
        # /admin/
│   │   ├── StatusGridList.tsx
│   │   └── StatusTable.tsx
│   ├── banner
        # /admin/banner/
│   │   ├── BannerCreateDialog.tsx
│   │   ├── BannerDeleteDialog.tsx
│   │   ├── BannerEditDialog.tsx
│   │   ├── BannerFab.tsx
│   │   ├── BannerManageTable.tsx
│   │   ├── BannerReleaseChip.tsx
│   │   └── requests.ts
│   ├── category
        # /admin/category/
│   │   ├── CategoryCreateDialog.tsx
│   │   ├── CategoryDeleteDialog.tsx
│   │   ├── CategoryEditDialog.tsx
│   │   ├── CategoryFab.tsx
│   │   ├── CategoryManageTable.tsx
│   │   ├── CategoryTabs.tsx
│   │   └── CategoryTree.tsx
│   ├── layouts
        # common layout components
│   │   ├── HeaderMenu.tsx
│   │   ├── ManageMenu.tsx
│   │   └── SideMenu.tsx
│   ├── path
        # /admin/path
│   │   ├── DnDList.tsx
│   │   ├── ManagePlayList.tsx
│   │   ├── PathCreateDialog.tsx
│   │   ├── PathDeleteDialog.tsx
│   │   ├── PathFab.tsx
│   │   ├── PathManageTable.tsx
│   │   ├── VideoAppendDialog.tsx
│   │   └── VideoRemoveDialog.tsx
│   ├── player
        # /player
│   │   ├── ActionButton.tsx
│   │   ├── Comments.tsx
│   │   ├── PlayList.tsx
│   │   ├── ReplyItem.tsx
│   │   ├── ReplyList.tsx
│   │   ├── ThreadEditor.tsx
│   │   ├── ThreadItem.tsx
│   │   ├── Threads.tsx
│   │   ├── UserAction.tsx
│   │   └── VideoPlayer.tsx
│   ├── tag
        # /admin/tag
│   │   ├── TagCreateDialog.tsx
│   │   ├── TagDeleteDialog.tsx
│   │   ├── TagEditDialog.tsx
│   │   ├── TagFab.tsx
│   │   ├── TagManageList.tsx
│   │   └── TagManageTable.tsx
│   ├── user
        # /admin/user
│   │   ├── UserManageTable.tsx
│   │   └── UserPermissionChip.tsx
│   ├── video
        # /admin/video
│   │   ├── TableToolbar.tsx
│   │   ├── TagConfig.tsx
│   │   ├── VideoCreateDialog.tsx
│   │   ├── VideoDeleteDialog.tsx
│   │   ├── VideoEditDialog.tsx
│   │   ├── VideoFab.tsx
│   │   ├── VideoManageTable.tsx
│   │   └── uploader.tsx
│   └── view
        # /
│       ├── Banner.tsx
│       ├── SimpleBanner.tsx
│       ├── TagGridList.tsx
│       ├── VideoGridList.tsx
│       └── VideoItem.tsx
├── data
    # datagrid definition
│   ├── bannerData.tsx
│   ├── categoryData.tsx
│   ├── description.tsx
│   ├── fetcher.tsx
│   ├── pathData.tsx
│   ├── tagData.tsx
│   ├── userData.tsx
│   └── videoData.tsx
├── foundations
    # common helpers
│   ├── AppProvider.tsx
│   ├── axios.ts
│   ├── dataGridjaJP.tsx
│   └── util.tsx
├── interfaces
    # @types from openapi
│   ├── api
│   │   ├── api.ts
│   │   ├── base.ts
│   │   ├── common.ts
│   │   ├── configuration.ts
│   │   ├── git_push.sh
│   │   └── index.ts
│   └── index.ts
├── layouts
    # common layouts
│   ├── AdminLayout.tsx
│   ├── SamplePage.tsx
│   └── ViewerLayout.tsx
├── pages
        # common page server side & client side
│   ├── _app.tsx
        # common page server side
│   ├── _document.tsx
│   ├── admin
        # /admin/*
│   │   ├── banner.tsx
│   │   ├── category.tsx
│   │   ├── index.tsx
│   │   ├── learningPath.bk.tsx
│   │   ├── playlist
│   │   ├── tag.tsx
│   │   ├── user.tsx
│   │   └── video.tsx
│   ├── api
        # /api/*
│   │   ├── auth
│   │   ├── tag.ts
│   │   └── tags.ts
│   ├── index.tsx
│   └── player
        # /player/[id]
│       ├── [id].tsx
│       └── index.tsx
├── styles
    # styled components
│   ├── SamplePage.ts
│   ├── bannerDialog.ts
│   ├── datagrid.ts
│   ├── globals.css
│   ├── index.css
│   ├── theme.ts
│   ├── videoCreateDialog.ts
│   └── videoEditDialog.ts
└── test
    # tests
    ├── __mocks__
    │   └── fileMock.js
    ├── components
    │   ├── Bannaer.test.tsx
    │   ├── TagGridList.test.tsx
    │   └── __snapshots__
    ├── pages
    │   ├── __snapshots__
    │   └── index.test.tsx
    └── testUtils.ts

30 directories, 122 files
```

どこでブランチ切ればいいか不安になってきた。。
