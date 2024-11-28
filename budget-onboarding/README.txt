# LandingPage Component Documentation

## Overview
The LandingPage component is a React component built for a Next.js application. It creates an interactive landing page with a changing background and informational slides. The page is divided into two main sections: a top section with a title and changing background, and a bottom section with interactive slides and a call-to-action button.

## Imports

The component imports:
- useState and useEffect from React for state management and side effects
- Image from Next.js for optimized image rendering
- Button, Card, and CardContent from a custom UI library (likely shadcn/ui)
- ArrowLeft and ArrowRight icons from 'lucide-react'

## Component Interface

The component accepts a single prop:
- onBegin: () => void
  A function to be called when the user clicks the "Begin" button.

## Slide Data

An array of slide objects, each containing:
- title: string
- content: string
- backgroundImage: string (URL)

## Component Function

The main LandingPage function component manages the state and renders the UI.

## State Management

The component uses two state variables:
- currentSlide: Keeps track of which slide is currently displayed
- backgroundImage: Stores the URL of the current background image

## Side Effects

A useEffect hook updates the background image whenever the current slide changes.

## Navigation Functions

- nextSlide: Moves to the next slide (with circular navigation)
- prevSlide: Moves to the previous slide (with circular navigation)

## Component Structure

1. Full-screen background image
2. Top section with a title
3. Bottom section containing:
   - Card with current slide's content
   - Navigation buttons
   - Slide indicators
   - "Begin" button

### Background Image

A full-screen image that changes with each slide.

### Top Section

Displays the main title "Custom Budget Creator" with a semi-transparent background.

### Bottom Section

Takes up 50% of the viewport height and contains:

#### Slide Content

Displays the current slide's title and content in a card component.

#### Navigation

Buttons to navigate between slides.

#### Slide Indicators

A series of dots indicating the current slide and total number of slides.

#### Begin Button

When clicked, calls the onBegin function passed as a prop.

## Accessibility

The component includes aria-labels for the navigation buttons.

## Responsiveness

Uses flexbox and responsive utility classes for various screen sizes.

## Conclusion

This LandingPage component creates an engaging, interactive introduction to the application, using modern React patterns and Next.js features.

