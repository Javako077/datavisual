# Interactive Data Visualization Dashboard

A modern, fully responsive data visualization dashboard built with React, Vite, and Tailwind CSS.

## Features

- 🎨 **Modern UI**: Clean glassmorphism design with dark/light mode
- 📊 **Interactive Charts**: Bar, line, pie, and area charts with animations
- 📱 **Responsive Design**: Works on mobile, tablet, and desktop
- 🔍 **Advanced Filtering**: Date range, category, and search filters
- 📈 **Real-time KPIs**: Revenue, users, sales, and conversion metrics
- 📋 **Data Export**: Download charts and tables as CSV
- 🎭 **Smooth Animations**: Framer Motion powered transitions
- 🌙 **Theme Toggle**: Light and dark mode support
- 🔄 **Loading States**: Skeleton loaders and error boundaries

## Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Project Structure

```
src/
├── components/
│   ├── charts/          # Reusable chart components
│   ├── ErrorBoundary.jsx
│   ├── KPICard.jsx
│   ├── LoadingSkeleton.jsx
│   ├── Sidebar.jsx
│   └── TopNavbar.jsx
├── context/
│   └── ThemeContext.jsx # Dark/light mode management
├── data/
│   └── mockData.js      # Mock dataset
├── pages/
│   ├── Dashboard.jsx    # Main dashboard
│   ├── SalesAnalytics.jsx
│   ├── UserAnalytics.jsx
│   └── Reports.jsx
├── utils/
│   └── helpers.js       # Utility functions
└── App.jsx
```

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Pages

- **Dashboard Overview**: KPI cards, sales trends, regional distribution
- **Sales Analytics**: Detailed sales performance and category analysis
- **User Analytics**: User behavior, engagement metrics, demographics
- **Reports**: Data tables with sorting, filtering, and CSV export

## Key Components

### Charts
- `AnimatedLineChart`: Line charts with hover tooltips
- `AnimatedBarChart`: Bar charts with drill-down functionality
- `AnimatedPieChart`: Pie charts with segment interactions
- `AnimatedAreaChart`: Area charts with gradient fills

### UI Components
- `KPICard`: Metric cards with growth indicators
- `LoadingSkeleton`: Loading states for better UX
- `TopNavbar`: Search, filters, and theme toggle
- `Sidebar`: Responsive navigation menu

## Features in Detail

### Interactive Charts
- Hover tooltips with detailed information
- Click events for drill-down functionality
- Smooth animations and transitions
- Responsive design for all screen sizes

### Filtering & Search
- Date range filters (7d, 30d, 90d, 1y)
- Category-based filtering
- Real-time search functionality
- Sort by multiple columns

### Data Export
- Export chart data as CSV
- Download filtered table data
- Formatted data with proper headers

### Theme Support
- System preference detection
- Manual theme toggle
- Persistent theme selection
- Smooth theme transitions

## Customization

### Adding New Charts
1. Create chart component in `src/components/charts/`
2. Import and use in desired page
3. Pass data and configuration props

### Adding New Pages
1. Create page component in `src/pages/`
2. Add route in `App.jsx`
3. Add navigation item in `Sidebar.jsx`

### Modifying Data
- Update `src/data/mockData.js` for static data
- Integrate with real API by replacing mock data calls

## Performance

- Code splitting with React.lazy (can be added)
- Optimized re-renders with React.memo
- Efficient chart rendering with Recharts
- Minimal bundle size with tree shaking

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License