const mongoose = require("mongoose");

const DogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female'],
        default: 'Male'
    },

    age: {
        type: Number,
        required: true,
        min: 0
    },

    breed: {
        type: String,
        required: true,
        enum: [
            'Affenpinscher',
            'Afghan Hound',
            'Airedale Terrier',
            'Akita',
            'Alaskan Malamute',
            'American Staffordshire Terrier',
            'Anatolian Shepherd',
            'Australian Cattle Dog',
            'Australian Shepherd',
            'Basenji',
            'Basset Hound',
            'Beagle',
            'Beardie',
            'Belgian Malinois',
            'Bernese Mountain Dog',
            'Bichon Frise',
            'Bloodhound',
            'Boerboel',
            'Bolognese',
            'Border Collie',
            'Borzoi',
            'Boston Terrier',
            'Boxer',
            'Brittany',
            'Brussels Griffon',
            'Bull Terrier',
            'Bulldog',
            'Bullmastiff',
            'Cairn Terrier',
            'Cane Corso',
            'Cardigan Welsh Corgi',
            'Cavalier King Charles Spaniel',
            'Chesapeake Bay Retriever',
            'Chihuahua',
            'Chinese Crested',
            'Chinese Shar-Pei',
            'Chow Chow',
            'Chug',
            'Cocker Spaniel',
            'Collie',
            'Dachshund',
            'Dalmatian',
            'Doberman Pinscher',
            'Dogue de Bordeaux',
            'English Cocker Spaniel',
            'English Setter',
            'English Springer Spaniel',
            'French Bulldog',
            'German Shepherd',
            'German Shorthaired Pointer',
            'Giant Schnauzer',
            'Golden Retriever',
            'Gordon Setter',
            'Great Dane',
            'Great Pyrenees',
            'Greyhound',
            'Havanese',
            'Irish Setter',
            'Irish Wolfhound',
            'Italian Greyhound',
            'Jack Russell Terrier',
            'Japanese Chin',
            'Labradoodle',
            'Labrador Retriever',
            'Lhasa Apso',
            'Maltese',
            'Mastiff',
            'Miniature Pinscher',
            'Miniature Schnauzer',
            'Newfoundland',
            'Old English Sheepdog',
            'Papillon',
            'Pekingese',
            'Pembroke Welsh Corgi',
            'Pointer',
            'Pomeranian',
            'Poodle',
            'Portuguese Water Dog',
            'Pug',
            'Rhodesian Ridgeback',
            'Rottweiler',
            'Saint Bernard',
            'Samoyed',
            'Schipperke',
            'Scottish Terrier',
            'Shetland Sheepdog',
            'Shiba Inu',
            'Shih Tzu',
            'Siberian Husky',
            'Silky Terrier',
            'Staffordshire Bull Terrier',
            'Standard Schnauzer',
            'Tibetan Mastiff',
            'Tibetan Terrier',
            'Toy Poodle',
            'Vizsla',
            'Weimaraner',
            'Welsh Terrier',
            'West Highland White Terrier',
            'Whippet',
            'Yorkshire Terrier',
            'Other'
        ],
        default: 'Other'
    },

    size: {
        type: String,
        required: true,
        enum: ['Small', 'Medium', 'Large', 'Extra Large'],
        default: 'Medium'
    },

    personality: {
        type: String,
        required: true,
        trim: true
    },

    energy: {
        type: String,
        required: true,
        enum: ['Low', 'Moderate', 'High'],
        default: 'Moderate'
    },

    goodWith: {
        type: [String],
        required: true,
        enum: ['Other Dogs', 'Other Pets', 'Strangers', 'Children', 'Loud Sounds'],
        default: []
    },

    badWith: {
        type: [String],
        required: true,
        enum: ['Other Dogs', 'Other Pets', 'Strangers', 'Children', 'Loud Sounds'],
        default: []
    },

    location: {
        type: String,
        required: true,
        trim: true
    },

    about: {
        type: String,
        required: true,
        trim: true
    },

    image: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    adoptionAvailability: {
        type: Boolean,
        default: true,
    },

    adopter: {
        type: String,
        trim: true,
        default: ""
    },

    adopterEmail: {
        type: String,
        trim: true,
        default: "",
        unique: true,
    },
},
    { timestamps: true }
);

const Dog = mongoose.model("Dog", DogSchema, "dogs");
module.exports = Dog;