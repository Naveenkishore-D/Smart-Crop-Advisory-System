"""
train_model.py - Machine Learning Model Training Script
Smart Crop Advisory System
Trains a RandomForestClassifier on the crop recommendation dataset
and saves the model as model.pkl
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import pickle
import os

def train_and_save_model():
    print("=" * 60)
    print("   SMART CROP ADVISORY - ML MODEL TRAINING")
    print("=" * 60)

    # ── 1. Load Dataset ────────────────────────────────────────────
    dataset_path = os.path.join(os.path.dirname(__file__), 'dataset', 'crop_dataset.csv')
    print(f"\n[1] Loading dataset from: {dataset_path}")
    df = pd.read_csv(dataset_path)
    print(f"    Dataset shape: {df.shape}")
    print(f"    Columns: {list(df.columns)}")
    print(f"    Crops available: {sorted(df['label'].unique())}")

    # ── 2. Prepare Features & Labels ──────────────────────────────
    print("\n[2] Preparing features and labels...")
    feature_cols = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    X = df[feature_cols].values
    y = df['label'].values

    # Encode crop labels to integers
    le = LabelEncoder()
    y_encoded = le.fit_transform(y)
    print(f"    Feature columns: {feature_cols}")
    print(f"    Label classes: {list(le.classes_)}")

    # ── 3. Train/Test Split ────────────────────────────────────────
    print("\n[3] Splitting data (80% train, 20% test)...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y_encoded, test_size=0.25, random_state=42
    )
    print(f"    Training samples: {len(X_train)}")
    print(f"    Testing samples:  {len(X_test)}")

    # ── 4. Train RandomForestClassifier ───────────────────────────
    print("\n[4] Training RandomForestClassifier...")
    model = RandomForestClassifier(
        n_estimators=200,
        max_depth=None,
        min_samples_split=2,
        min_samples_leaf=1,
        random_state=42,
        n_jobs=-1
    )
    model.fit(X_train, y_train)
    print("    Model training complete!")

    # ── 5. Evaluate Model ─────────────────────────────────────────
    print("\n[5] Evaluating model performance...")
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"    ✅ Accuracy: {accuracy * 100:.2f}%")

    # Decode labels for readable report
    y_test_labels = le.inverse_transform(y_test)
    y_pred_labels = le.inverse_transform(y_pred)
    print("\n    Classification Report:")
    print(classification_report(y_test_labels, y_pred_labels))

    # Feature importance
    print("\n[6] Feature Importances:")
    importances = model.feature_importances_
    for feat, imp in sorted(zip(feature_cols, importances), key=lambda x: -x[1]):
        bar = "█" * int(imp * 50)
        print(f"    {feat:<15} {imp:.4f}  {bar}")

    # ── 6. Save Model ─────────────────────────────────────────────
    model_data = {
        'model': model,
        'label_encoder': le,
        'feature_columns': feature_cols,
        'accuracy': accuracy,
        'classes': list(le.classes_)
    }
    model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
    with open(model_path, 'wb') as f:
        pickle.dump(model_data, f)
    print(f"\n[7] ✅ Model saved to: {model_path}")
    print(f"    File size: {os.path.getsize(model_path) / 1024:.1f} KB")
    print("\n" + "=" * 60)
    print("   MODEL TRAINING COMPLETE!")
    print("=" * 60)
    return accuracy


if __name__ == '__main__':
    train_and_save_model()
