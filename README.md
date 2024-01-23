## 技術要素

- JavaScript フレームワーク: Next.js (React Hooks)
- 言語: TypeScript
- 状態管理: Redux Toolkit
- CSS ライブラリ: styled-components
- コード整形: ESLint + Prettier
- コンポーネント管理: Storybook
- リセット用 CSS: sanitize.css
- Test ライブラリ: Jest + React Testing Library + Cypress(E2E Test) + Storyshots(Snapshot Test)

## 必要な VScode のプラグイン

- prettier
- ES7 React
- vscode-styled-components

## ディレクトリ構成

- src

  - compoonents

    - atoms: 使い回しができそうな最小単位のコンポーネント (ボタンやフォームやタイトルなど)
    - molecules: 複数のコンポーネントの中で使いまわされるパーツ (atoms もしくは molecules を組み合わせたもの)
    - organisms: ヘッダーやフッターなどのパーツ (atoms や molecules を組み合わせたもの)
      - Compornent.tsx: コンポーネント本体
      - Component.test.tsx: Unit テストのファイル
      - CompornentContainer.tsx: store とのやりとりをするコンポーネント (コンポーネントの実体は Compornent.tsx)

  - pages: ページコンポーネント
  - stores
    - index.ts: ストアの生成ファイル
    - slices: 各種 slice
  - styles: 共通 style
