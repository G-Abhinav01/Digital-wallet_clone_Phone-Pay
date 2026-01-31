# PhonePe App - Pixel-Perfect UI Clone Design Guidelines

## Brand Identity
**Purpose**: Create an exact visual replica of the PhonePe app, focusing on the digital payments platform's distinctive purple branding and quick-access financial services interface.

**Aesthetic Direction**: Bold/striking - High contrast purple-dominant design with clean white surfaces, prominent CTAs, and organized grid-based quick actions.

**Memorable Element**: The signature PhonePe purple gradient (#5F259F to #8B4FCF) combined with the distinctive scanner circle overlay and wallet balance header.

## Navigation Architecture

**Root Navigation**: Bottom Tab Navigation (5 tabs)
- Home (primary landing screen)
- Stores
- Insurance  
- Wealth
- History

**No Authentication Required** - This is a UI-only clone without backend

## Screen-by-Screen Specifications

### Home Screen (Primary)
**Purpose**: Main hub for all payment and financial services

**Header** (Custom, transparent):
- Left: Profile avatar circle
- Center: Wallet balance display with "PhonePe Wallet" label
- Right: Bell icon (notifications), QR scanner icon

**Main Content** (Scrollable):
- **Scanner Section**: Large circular scanner button with gradient border, "Pay Anyone" text, "Scan any QR" subtitle
- **Quick Actions Grid**: 4x2 or 3x3 grid of icon tiles (Send Money, Recharge, Pay Bills, etc.) - white rounded squares with purple icons
- **Offers/Banners**: Horizontal scrollable cards with promotional content
- **Merchant Sections**: Categorized payment options
- **Bottom spacing**: tabBarHeight + 24px

**Components**: Icon tiles, balance card, scanner overlay, promotional cards

### Scanner Mock Screen (Modal)
**Purpose**: Simulate QR code scanning interface

**Layout**:
- Full-screen camera preview overlay (black background)
- Central white square frame for QR scanning area
- "Scan any QR" text at top
- Close button (X) top-right
- Mock payment shortcuts at bottom

### Accounts Section (Modal/Drawer)
**Purpose**: Display linked bank accounts and cards

**Layout**:
- Header: "Bank Accounts" title, close button
- Account cards with:
  - Bank logo placeholder
  - Account type and last 4 digits
  - Balance (mocked)
- Add account button at bottom

### Dummy Screens (Stores, Insurance, Wealth, History)
**Layout**: Simple placeholder screens with:
- Screen title in header
- "Coming Soon" or feature description text centered
- Background matching PhonePe color scheme

## Color Palette

**Primary Colors**:
- Primary Purple: `#5F259F`
- Primary Gradient End: `#8B4FCF`
- Accent Purple: `#6739B7`

**Background**:
- App Background: `#F5F5F5` (light gray)
- Surface White: `#FFFFFF`
- Header Background: `#5F259F` (purple)

**Text**:
- Primary Text: `#1C1C1E`
- Secondary Text: `#6B6B6B`
- Light Text on Dark: `#FFFFFF`

**Semantic**:
- Success Green: `#00C853`
- Alert Red: `#D32F2F`

## Typography

**Font**: System Default (SF Pro/Roboto)
- Header Large: 24px, Bold
- Balance Amount: 28px, Semibold
- Section Title: 18px, Semibold  
- Quick Action Label: 12px, Regular
- Body Text: 14px, Regular
- Caption: 11px, Regular

## Visual Design

**Icons**: Use Ionicons/MaterialIcons from @expo/vector-icons
- Scanner icon: QR code symbol
- Navigation icons: Outlined style, 24px
- Quick action icons: Filled style, 28px, purple color

**Buttons**:
- Quick action tiles: White background, 2px border radius, subtle shadow
- Primary CTAs: Purple gradient background, white text, 8px border radius
- Scanner button: Large circular with gradient ring border

**Cards**: 
- White background, 12px border radius, shadowOpacity: 0.08, shadowRadius: 4

**Touchable Feedback**: Opacity change to 0.7 on press

## Assets to Generate

**Required**:
1. `icon.png` - App icon with PhonePe purple "P" logo - Used on device home screen
2. `splash-icon.png` - PhonePe logo for launch screen - Shown during app launch
3. `scanner-overlay.png` - White square frame for QR scanner - Used in scanner modal screen
4. `empty-history.png` - Illustration for empty transaction history - Used in History tab empty state
5. `wallet-illustration.png` - Small wallet icon for balance section - Used in home header

**Profile Avatars** (generate 3 variations):
6. `avatar-1.png` - Circular gradient avatar (purple/blue) - Profile button
7. `avatar-2.png` - Circular gradient avatar (purple/pink) - Profile button  
8. `avatar-3.png` - Circular gradient avatar (purple/orange) - Profile button

**Quick Action Icons** (use vector icons instead - Ionicons):
- Send: `send-outline`
- Recharge: `phone-portrait-outline`
- Bills: `receipt-outline`
- etc.

## Mock Functionality Requirements

**All touchable elements must**:
- Use TouchableOpacity/Pressable
- Show console.log or Alert on press
- Indicate action (e.g., "Scanner opened", "Recharge clicked")

**Scanner Button**: Opens scanner modal with overlay
**Account Section**: Opens modal with bank account tiles
**Quick Actions**: Log action name to console
**Bottom Tabs**: Navigate to respective dummy screens

## Layout Precision

**Spacing System** (match PhonePe pixel-perfect):
- xs: 4px
- sm: 8px  
- md: 12px
- lg: 16px
- xl: 24px

**Grid**: Quick action tiles should be evenly spaced in 3-4 column grid with 12px gaps

**Safe Areas**:
- Top with header: headerHeight + 16px
- Bottom with tabs: tabBarHeight + 24px