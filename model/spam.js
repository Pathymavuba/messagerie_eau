const express = require("express")
const mongoose = require("mongoose")

const SpanSchema = mongoose.Schema(
    {
        text: { type: String },
        image: String,
        fichier: String,
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        conversation: { type: mongoose.Schema.Types.ObjectId, ref: "conversation" },
      },
      { timestamps: true }
)

module.exports = mongoose.model("spam",SpanSchema)