# How to Add Buttons to Settings Panels

This guide explains how to add new action buttons to any settings panel (General Settings, Outer Ear, Middle Ear, or Inner Ear). No prior JavaScript/React experience required!

## 📋 Table of Contents
1. [Understanding the System](#understanding-the-system)
2. [Step-by-Step Instructions](#step-by-step-instructions)
3. [Real Examples](#real-examples)
4. [Troubleshooting](#troubleshooting)

---

## Understanding the System

### How It Works (Simple Overview)

When you click a button in a settings panel:
1. **Button** sends a request to the backend API
2. **API** processes the data and returns results
3. **Graph Panel** displays the results as a chart

Think of it like a vending machine:
- **Button** = what you press
- **API** = the machine that prepares your item
- **Graph** = the item you receive

---

## Step-by-Step Instructions

### Overview: 4 Steps to Add a New Button

```
Step 1: Prepare the state (where results are stored)
Step 2: Create the API function (how to get data from backend)
Step 3: Add the button (what the user clicks)
Step 4: Test it!
```

---

### **STEP 1: Prepare the State** 📦

**What is this?** This tells the app "I want to store results from a new type of analysis."

**File to edit:** `src/App.jsx`

**What to do:**
1. Open `src/App.jsx`
2. Find the section that looks like this (around line 71-77):

```javascript
const [analysisResults, setAnalysisResults] = useState({
  inputSpectrum: { data: null, loading: false }
  // To add more analysis types, simply add new keys here:
  // outputSpectrum: { data: null, loading: false },
  // phaseResponse: { data: null, loading: false },
  // spatialAnalysis: { data: null, loading: false },
});
```

3. **Add a new line** for your analysis. For example, if you want to add an "output spectrum" button:

```javascript
const [analysisResults, setAnalysisResults] = useState({
  inputSpectrum: { data: null, loading: false },
  outputSpectrum: { data: null, loading: false },    // ← ADD THIS LINE
  // To add more analysis types, simply add new keys here:
  // phaseResponse: { data: null, loading: false },
});
```

**Important:**
- Don't forget the comma after the previous line!
- The name you choose (`outputSpectrum`) will be used in Step 3
- Use camelCase: first word lowercase, subsequent words capitalized (e.g., `myNewAnalysis`)

---

### **STEP 2: Create the API Function** 🔌

**What is this?** This is the code that connects to your backend server to get data.

**File to edit:** `src/services/api.jsx`

**What to do:**
1. Open `src/services/api.jsx`
2. Look at the existing function as a template:

```javascript
export const getInputSignal = async (settings) => {
  const params = {
    fi: settings.frequencyMin,
    ff: settings.frequencyMax,
    nf: settings.numberOfFrequencies,
    inputSignal: settings.inputSignal
  };

  return apiClient.get('/input-signal/magnitude-spectrum', { params });
};
```

3. **Copy and modify** it for your new endpoint. For example:

```javascript
export const getOutputSignal = async (settings) => {
  const params = {
    fi: settings.frequencyMin,
    ff: settings.frequencyMax,
    nf: settings.numberOfFrequencies,
    inputSignal: settings.inputSignal
  };

  return apiClient.get('/output-signal/magnitude-spectrum', { params });
};
```

**What to change:**
- **Function name**: `getOutputSignal` (choose a descriptive name)
- **Endpoint**: `'/output-signal/magnitude-spectrum'` (must match your backend API endpoint)
- **Parameters**: Include only the settings your backend needs

**Parameter Guide:**
```javascript
const params = {
  parameterName: settings.settingName,
  // Examples:
  fi: settings.frequencyMin,           // frequency initial
  ff: settings.frequencyMax,           // frequency final
  nf: settings.numberOfFrequencies,    // number of frequencies
  length: settings.earCanalLength,     // for outer ear settings
};
```

---

### **STEP 3: Add the Button** 🔘

**What is this?** This creates the actual button that users will click.

**File to edit:** Choose based on which menu you want to add the button to:
- General Settings: `src/components/settingsSections/GeneralSettings.jsx`
- Outer Ear: `src/components/settingsSections/OuterEarSettings.jsx`
- Middle Ear: `src/components/settingsSections/MiddleEarSettings.jsx`
- Inner Ear: `src/components/settingsSections/InnerEarSettings.jsx`

**What to do (example for General Settings):**

1. Open `src/components/settingsSections/GeneralSettings.jsx`

2. At the **top** of the file, import your API function from Step 2:

```javascript
import React from 'react';
import { getInputSignal } from '../../services/api';
import { getOutputSignal } from '../../services/api';  // ← ADD THIS LINE
```

3. Find where the existing button is (around line 58-68):

```javascript
<button
  className="btn-primary"
  onClick={() => onAnalysisAction(
    'inputSpectrum',
    getInputSignal,
    settings,
    { title: 'Espectro de magnitude do sinal de entrada', color: '#3b82f6' }
  )}
>
  Ver espectro
</button>
```

4. **Copy and paste** this button code below it, then modify:

```javascript
<button
  className="btn-primary"
  onClick={() => onAnalysisAction(
    'outputSpectrum',                          // ← Name from Step 1
    getOutputSignal,                           // ← Function from Step 2
    settings,                                  // ← Settings to send
    { title: 'Espectro de saída', color: '#ef4444' }  // ← Chart customization
  )}
>
  Ver espectro de saída                        // ← Button text (what user sees)
</button>
```

**Button Anatomy Explained:**

```javascript
<button
  className="btn-primary"                      // Button style (btn-primary or btn-secondary)
  onClick={() => onAnalysisAction(
    'outputSpectrum',                          // Key from Step 1 (must match exactly!)
    getOutputSignal,                           // API function from Step 2
    settings,                                  // Data to send (usually "settings")
    {
      title: 'Espectro de saída',             // Chart title
      color: '#ef4444'                         // Chart line color (hex color)
    }
  )}
>
  Ver espectro de saída                        // Text shown on the button
</button>
```

**Color Options:**
- Blue: `#3b82f6`
- Red: `#ef4444`
- Green: `#10b981`
- Purple: `#8b5cf6`
- Orange: `#f59e0b`
- Yellow: `#eab308`

---

### **STEP 4: Test It!** ✅

1. **Save all files** you edited
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open your browser** and navigate to the app
4. **Click on the menu item** where you added the button
5. **Click the new button** and verify:
   - Loading indicator appears
   - Chart displays with correct title and color
   - No errors in browser console (press F12 to open)

---

## Real Examples

### Example 1: Add "View Phase Response" Button to General Settings

**Step 1 - Edit `src/App.jsx`:**
```javascript
const [analysisResults, setAnalysisResults] = useState({
  inputSpectrum: { data: null, loading: false },
  phaseResponse: { data: null, loading: false },  // ← ADDED
});
```

**Step 2 - Edit `src/services/api.jsx`:**
```javascript
export const getPhaseResponse = async (settings) => {
  const params = {
    fi: settings.frequencyMin,
    ff: settings.frequencyMax,
    nf: settings.numberOfFrequencies,
  };

  return apiClient.get('/phase-response', { params });
};
```

**Step 3 - Edit `src/components/settingsSections/GeneralSettings.jsx`:**

Add import at top:
```javascript
import { getInputSignal, getPhaseResponse } from '../../services/api';
```

Add button in the component:
```javascript
<button
  className="btn-secondary"
  onClick={() => onAnalysisAction(
    'phaseResponse',
    getPhaseResponse,
    settings,
    { title: 'Resposta de Fase', color: '#10b981' }
  )}
>
  Ver resposta de fase
</button>
```

---

### Example 2: Add "Spatial Analysis" Button to Outer Ear Settings

**Step 1 - Edit `src/App.jsx`:**
```javascript
const [analysisResults, setAnalysisResults] = useState({
  inputSpectrum: { data: null, loading: false },
  spatialAnalysis: { data: null, loading: false },  // ← ADDED
});
```

**Step 2 - Edit `src/services/api.jsx`:**
```javascript
export const getSpatialAnalysis = async (settings) => {
  const params = {
    length: settings.earCanalLength,
    frequencies: settings.freqsToAnalyze,
  };

  return apiClient.get('/outer-ear/spatial-analysis', { params });
};
```

**Step 3 - Edit `src/components/settingsSections/OuterEarSettings.jsx`:**

Add import at top:
```javascript
import React from 'react';
import { getSpatialAnalysis } from '../../services/api';  // ← ADD THIS
```

Add this to the component props (find the line that starts with `export default function OuterEarSettings`):
```javascript
export default function OuterEarSettings({
  settings,
  handleInputChange,
  onSettingsChange,
  onClose,
  onAnalysisAction  // ← ADD THIS if not already there
}) {
```

Add button in the component:
```javascript
<button
  className="btn-primary"
  onClick={() => onAnalysisAction(
    'spatialAnalysis',
    getSpatialAnalysis,
    settings,
    { title: 'Análise Espacial', color: '#8b5cf6' }
  )}
>
  Executar análise espacial
</button>
```

---

### Example 3: Add Multiple Buttons to the Same Panel

You can add as many buttons as you want! Just repeat Step 1-3 for each button.

**In `GeneralSettings.jsx`:**
```javascript
<div className="settings-section">
  <h3>Análises Disponíveis</h3>

  <button
    className="btn-primary"
    onClick={() => onAnalysisAction(
      'inputSpectrum',
      getInputSignal,
      settings,
      { title: 'Espectro de Entrada', color: '#3b82f6' }
    )}
  >
    Ver espectro de entrada
  </button>

  <button
    className="btn-primary"
    onClick={() => onAnalysisAction(
      'outputSpectrum',
      getOutputSignal,
      settings,
      { title: 'Espectro de Saída', color: '#ef4444' }
    )}
  >
    Ver espectro de saída
  </button>

  <button
    className="btn-secondary"
    onClick={() => onAnalysisAction(
      'phaseResponse',
      getPhaseResponse,
      settings,
      { title: 'Resposta de Fase', color: '#10b981' }
    )}
  >
    Ver resposta de fase
  </button>
</div>
```

---

## Troubleshooting

### Common Issues and Solutions

#### ❌ **Error: "onAnalysisAction is not a function"**

**Problem:** The settings component doesn't have access to `onAnalysisAction`.

**Solution:**
1. Open the settings file (e.g., `OuterEarSettings.jsx`)
2. Find the function definition line:
   ```javascript
   export default function OuterEarSettings({ settings, handleInputChange, onClose }) {
   ```
3. Add `onAnalysisAction` to the props:
   ```javascript
   export default function OuterEarSettings({ settings, handleInputChange, onClose, onAnalysisAction }) {
   ```
4. Also update `src/components/SettingsPanel.jsx` to pass it through (see Example 2).

---

#### ❌ **Error: "getMyFunction is not defined"**

**Problem:** You forgot to import the API function.

**Solution:** Add the import at the top of your settings file:
```javascript
import { getMyFunction } from '../../services/api';
```

---

#### ❌ **Button doesn't do anything / No loading indicator**

**Problem:** The result key doesn't match between Step 1 and Step 3.

**Solution:** Make sure the name is **exactly the same** in both places:
```javascript
// In App.jsx (Step 1):
const [analysisResults, setAnalysisResults] = useState({
  myAnalysis: { data: null, loading: false },  // ← This name...
});

// In settings component (Step 3):
onClick={() => onAnalysisAction(
  'myAnalysis',  // ← ...must match this name exactly!
  getMyFunction,
  settings,
  { title: 'My Analysis', color: '#3b82f6' }
)}
```

---

#### ❌ **Chart doesn't appear but no errors**

**Problem:** Backend endpoint might be wrong or returning unexpected data format.

**Solution:**
1. Open browser console (F12)
2. Click the button
3. Look for the console.log messages showing what data was received
4. Verify your backend endpoint is correct in `api.jsx`
5. Make sure backend returns data with `freq_vec` and `magnitude` fields

---

#### ❌ **Syntax Error: Unexpected token**

**Problem:** Missing comma or bracket.

**Solution:**
- Check that each line in the state object ends with a comma (except the last one)
- Make sure all `{` have matching `}`
- Make sure all `(` have matching `)`

**Example of correct syntax:**
```javascript
const [analysisResults, setAnalysisResults] = useState({
  analysis1: { data: null, loading: false },  // ← comma
  analysis2: { data: null, loading: false },  // ← comma
  analysis3: { data: null, loading: false }   // ← NO comma (last item)
});  // ← closing bracket and semicolon
```

---

## Quick Reference Card

**Copy this checklist when adding a new button:**

```
□ STEP 1: Add to analysisResults in src/App.jsx
  - Name: ________________
  - Format: { data: null, loading: false }

□ STEP 2: Create API function in src/services/api.jsx
  - Function name: get________________
  - Endpoint: '________________'
  - Parameters needed: ________________

□ STEP 3: Add button to settings component
  - File: src/components/settingsSections/________________.jsx
  - Import API function at top
  - Add button with:
    - Result key (from Step 1): ________________
    - API function (from Step 2): ________________
    - Chart title: ________________
    - Chart color: ________________
    - Button text: ________________

□ STEP 4: Test
  - npm run dev
  - Click menu → Click button
  - Verify chart appears
```

---

## Additional Resources

### File Structure Reference
```
src/
├── App.jsx                          ← Step 1: Add state here
├── services/
│   └── api.jsx                      ← Step 2: Add API function here
└── components/
    └── settingsSections/
        ├── GeneralSettings.jsx      ← Step 3: Add button here (for General Settings)
        ├── OuterEarSettings.jsx     ← Step 3: Add button here (for Outer Ear)
        ├── MiddleEarSettings.jsx    ← Step 3: Add button here (for Middle Ear)
        └── InnerEarSettings.jsx     ← Step 3: Add button here (for Inner Ear)
```

### Button Style Classes
- `btn-primary` - Main action button (blue background)
- `btn-secondary` - Secondary action button (different style)

### Common Settings Available
When using `settings` parameter, these are available depending on which menu:

**General Settings:**
- `settings.frequencyMin`
- `settings.frequencyMax`
- `settings.numberOfFrequencies`
- `settings.inputSignal`

**Outer Ear Settings:**
- `settings.earCanalLength`
- `settings.freqsToAnalyze`

---

## Need Help?

If you get stuck:
1. Check the console for error messages (F12 in browser)
2. Verify all three steps were completed
3. Make sure names match exactly (case-sensitive!)
4. Check that your backend endpoint exists and returns the correct data format
5. Look at existing working examples in the code

---

**Last Updated:** 2025-01-09
**Version:** 1.0
