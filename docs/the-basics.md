---
id: the-basics
title: The Basics
sidebar_label: The Basics
slug: /
---

## Put a locally running HTTP, HTTPS or TLS app on the internet

localhost.run is a client-less tool to instantly make a locally running application available on an internet accessible URL.

All major operating systems already have SSH installed, and localhost.run uses SSH as a client, so no download is necessary to use the service and no account setup is needed for free domains.

To connect an internet domain to an application running locally on port 8080 open a command terminal and run:

```bash
ssh -R 80:localhost:8080 localhost.run
```

import { useState } from 'react'

export const PortChooser = () => {
  const [port, setPort] = useState(3000);
  return (
    <>
      running on&nbsp;
      <label for="port">local port</label>
      &nbsp;
      <input style={{width: "5em"}} type="number" id="port" name="port" min="1" max="65535" value={port} onChange={(event) => setPort(event.target.value)} />
      ?
      use this command:
      <pre><code parentName="pre" {...{
              "className": "bash"
            }}>{`ssh -R 80:localhost:${port} localhost.run
`}</code></pre>
    </>
  )
};

<PortChooser />
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import matplotlib.pyplot as plt

# Load dataset (PlantVillage or your custom data)
img_size = (128, 128)
batch_size = 32

train_ds = tf.keras.preprocessing.image_dataset_from_directory(
    "data/train",
    image_size=img_size,
    batch_size=batch_size
)

val_ds = tf.keras.preprocessing.image_dataset_from_directory(
    "data/val",
    image_size=img_size,
    batch_size=batch_size
)

# Normalize
normalization_layer = layers.Rescaling(1./255)
train_ds = train_ds.map(lambda x, y: (normalization_layer(x), y))
val_ds = val_ds.map(lambda x, y: (normalization_layer(x), y))

# Model
model = keras.Sequential([
    layers.Conv2D(32, 3, activation='relu', input_shape=(128,128,3)),
    layers.MaxPooling2D(),
    layers.Conv2D(64, 3, activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(128, 3, activation='relu'),
    layers.MaxPooling2D(),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(train_ds.cardinality().numpy(), activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

history = model.fit(train_ds, validation_data=val_ds, epochs=10)

# Save model
model.save("crop_disease_model.h5")

# Convert to TensorFlow Lite
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()
with open("crop_disease_model.tflite", "wb") as f:
    f.write(tflite_model)package com.example.cropdoctor

import android.app.Activity
import android.graphics.Bitmap
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import org.tensorflow.lite.Interpreter
import java.nio.ByteBuffer
import java.nio.ByteOrder

class MainActivity : Activity() {
    private lateinit var resultText: TextView
    private lateinit var imageView: ImageView
    private lateinit var tflite: Interpreter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        resultText = findViewById(R.id.resultText)
        imageView = findViewById(R.id.imageView)
        val scanBtn: Button = findViewById(R.id.scanBtn)

        // Load model
        val model = assets.open("crop_disease_model.tflite").readBytes()
        tflite = Interpreter(model)

        scanBtn.setOnClickListener {
            // TODO: Capture photo from camera
            val bitmap: Bitmap = captureImage() // your function
            val result = classifyImage(bitmap)
            resultText.text = result
        }
    }

    private fun classifyImage(bitmap: Bitmap): String {
        val inputSize = 128
        val buffer = ByteBuffer.allocateDirect(4 * inputSize * inputSize * 3)
        buffer.order(ByteOrder.nativeOrder())
        val resized = Bitmap.createScaledBitmap(bitmap, inputSize, inputSize, true)

        for (y in 0 until inputSize) {
            for (x in 0 until inputSize) {
                val px = resized.getPixel(x, y)
                buffer.putFloat(((px shr 16 and 0xFF) / 255.0f))
                buffer.putFloat(((px shr 8 and 0xFF) / 255.0f))
                buffer.putFloat(((px and 0xFF) / 255.0f))
            }
        }

        val output = Array(1) { FloatArray(4) } // Example: 4 classes
        tflite.run(buffer, output)

        val labels = listOf("Healthy", "Leaf Blight", "Rust", "Mosaic")
        val maxIdx = output[0].indices.maxByOrNull { output[0][it] } ?: -1
        return labels[maxIdx]
    }
}<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:gravity="center"
    android:padding="16dp"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <ImageView
        android:id="@+id/imageView"
        android:layout_width="200dp"
        android:layout_height="200dp"
        android:scaleType="centerCrop"/>

    <Button
        android:id="@+id/scanBtn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Scan My Crop"/>

    <TextView
        android:id="@+id/resultText"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Result will show here"
        android:textSize="18sp"/>
</LinearLayout>from flask import Flask, request, jsonify

app = Flask(__name__)
disease_reports = []

@app.route("/report", methods=["POST"])
def report():
    data = request.json
    disease_reports.append(data)
    return jsonify({"status": "success"}), 200

@app.route("/outbreaks", methods=["GET"])
def outbreaks():
    return jsonify(disease_reports)

if __name__ == "__main__":
    app.run(debug=True)
