const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, 'Building type is required'],
      enum: {
        values: ['residential', 'commercial', 'industrial'],
        message: '{VALUE} is not a valid building type',
      },
      trim: true,
      lowercase: true,
    },
    area: {
      type: Number,
      required: [true, 'Building area is required'],
      min: [10, 'Building area must be at least 10 sq ft/m²'],
      max: [100000, 'Building area cannot exceed 100,000 sq ft/m²'],
    },
    energyUsage: {
      type: Number,
      required: [true, 'Energy usage is required'],
      min: [0, 'Energy usage cannot be negative'],
    },
    waterUsage: {
      type: Number,
      required: [true, 'Water usage is required'],
      min: [0, 'Water usage cannot be negative'],
    },
    materials: {
      type: String,
      required: [true, 'Material classification is required'],
      enum: {
        values: ['eco-friendly', 'moderate', 'non-eco'],
        message: '{VALUE} is not a valid material classification',
      },
      lowercase: true,
      trim: true,
    },
    sustainabilityScore: {
      type: Number,
      default: 0,
      min: [0, 'Sustainability score cannot be less than 0'],
      max: [100, 'Sustainability score cannot exceed 100'],
    },
    recommendations: {
      type: [String],
      default: [],
    },
    efficiencyMetrics: {
      energyEfficiency: {
        type: Number,
        default: 0,
        min: [0, 'Energy efficiency minimum is 0'],
        max: [100, 'Energy efficiency maximum is 100'],
      },
      waterEfficiency: {
        type: Number,
        default: 0,
        min: [0, 'Water efficiency minimum is 0'],
        max: [100, 'Water efficiency maximum is 100'],
      },
      materialEfficiency: {
        type: Number,
        default: 0,
        min: [0, 'Material efficiency minimum is 0'],
        max: [100, 'Material efficiency maximum is 100'],
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Performance Indexing
buildingSchema.index({ type: 1 });
buildingSchema.index({ sustainabilityScore: -1 });
buildingSchema.index({ createdAt: -1 });

// Pre-save Intelligent Hook
buildingSchema.pre('save', function (next) {
  // 1. Normalize string fields
  if (this.type) {
    this.type = this.type.toLowerCase().trim();
  }
  if (this.materials) {
    this.materials = this.materials.toLowerCase().trim();
  }

  // 2. Clamp sustainability score between 0 and 100
  if (typeof this.sustainabilityScore === 'number') {
    this.sustainabilityScore = Math.max(0, Math.min(100, this.sustainabilityScore));
  }

  // 3. Efficiency Metrics Data Preparation
  if (this.area && this.area > 0) {
    // Energy efficiency score calculation (lower intensity = higher score)
    const energyIntensity = this.energyUsage / this.area;
    const rawEnergyEff = 100 - energyIntensity * 10;
    const energyEfficiency = Math.max(0, Math.min(100, Math.round(rawEnergyEff * 100) / 100));

    // Water efficiency score calculation (lower intensity = higher score)
    const waterIntensity = this.waterUsage / this.area;
    const rawWaterEff = 100 - waterIntensity * 10;
    const waterEfficiency = Math.max(0, Math.min(100, Math.round(rawWaterEff * 100) / 100));

    // Material efficiency score classification
    let materialEfficiency = 50;
    if (this.materials === 'eco-friendly') {
      materialEfficiency = 90;
    } else if (this.materials === 'moderate') {
      materialEfficiency = 60;
    } else if (this.materials === 'non-eco') {
      materialEfficiency = 30;
    }

    this.efficiencyMetrics = {
      energyEfficiency,
      waterEfficiency,
      materialEfficiency,
    };
  }

  next();
});

module.exports = mongoose.model('Building', buildingSchema);
