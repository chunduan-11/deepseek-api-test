
## 1. Architecture Design
本项目采用纯前端架构，使用 React + TypeScript + TailwindCSS 构建，游戏状态完全在客户端管理，无需后端服务。

```mermaid
graph TB
    A[React App] --> B[Game Store]
    B --> C[Game Logic]
    A --> D[Pages]
    D --> E[Home]
    D --> F[Game]
    D --> G[GameOver]
    A --> H[Components]
    H --> I[Board]
    H --> J[Card]
    H --> K[PlayerArea]
    H --> L[ActionPanel]
```

## 2. Technology Description
- Frontend: React@18 + TypeScript + TailwindCSS + Vite
- State Management: Zustand
- Initialization Tool: vite-init
- Backend: None
- Database: None

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| / | 首页 - 模式选择 |
| /game | 游戏页面 - 核心游戏界面 |
| /gameover | 游戏结束页面 - 结果展示 |

## 4. API Definitions (if backend exists)
无需后端 API

## 5. Server Architecture Diagram (if backend exists)
无需后端服务

## 6. Data Model
### 6.1 Data Model Definition
```mermaid
erDiagram
    GAME ||--o{ PLAYER : has
    GAME ||--o{ CARD : contains
    GAME ||--o{ NOBLE : displays
    PLAYER ||--o{ GEM : owns
    PLAYER ||--o{ CARD : owns
    PLAYER ||--o{ NOBLE : attracts
    
    GAME {
        string id
        int currentPlayer
        string phase
        string winner
    }
    
    PLAYER {
        int id
        string name
        boolean isAI
        int prestige
        GEM gems
        GEM bonuses
        CARD[] ownedCards
        NOBLE[] nobles
        CARD[] reservedCards
    }
    
    CARD {
        int id
        int level
        int prestige
        string gemType
        GEM cost
        boolean isReserved
    }
    
    NOBLE {
        int id
        int prestige
        GEM requirements
    }
    
    GEM {
        int emerald
        int sapphire
        int ruby
        int diamond
        int onyx
        int gold
    }
```

### 6.2 Data Definition Language
无需数据库
