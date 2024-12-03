import { View, Image, Pressable, Text, StyleSheet, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent, Animated } from 'react-native';
import { router } from 'expo-router';
import { useState, useRef, useEffect } from 'react';

interface LandingPageProps {
  onBegin: () => void;
}

// Get the screen width
const screenWidth = Dimensions.get('window').width;

const slides = [
  {
    title: "Custom Budget Creator",
    description: "Welcome to your personal budget planner! Our application helps you create a customized budget tailored to your unique financial situation.",
    image: require('../assets/images/budget-screen-1.png')
  },
  {
    title: "Track Your Spending",
    description: "Easily input and categorize your expenses. Get a clear picture of where your money goes each month.",
    image: require('../assets/images/budget-screen-2.png')
  },
  {
    title: "Set Financial Goals",
    description: "Define and track your financial goals. Whether it's saving for a house or paying off debt, we'll help you stay on track.",
    image: require('../assets/images/budget-screen-3.png')
  }
];

export default function LandingPage({ onBegin }: LandingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setPreviousSlide(currentSlide);
    opacity.setValue(0);
    
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentSlide]);

  const handleBegin = () => {
    router.push('/OnboardingFlow');
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = screenWidth;
    
    // Calculate current index based on scroll position
    const newIndex = Math.floor(contentOffset / viewSize + 0.5);
    if (newIndex !== currentSlide) {
      setCurrentSlide(newIndex);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageSection}>
        <Image
          source={slides[previousSlide].image}
          style={[styles.baseImage]}
          resizeMode="cover"
        />
        <Animated.Image
          source={slides[currentSlide].image}
          style={[
            styles.baseImage,
            styles.animatedImage,
            { opacity }
          ]}
          resizeMode="cover"
        />
      </View>

      <View style={styles.content}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          style={styles.slideContainer}
          decelerationRate="fast"
          snapToInterval={screenWidth}
          snapToAlignment="center"
          contentContainerStyle={styles.scrollContent}
          scrollEventThrottle={16}
          snapToOffsets={slides.map((_, index) => index * screenWidth)}
          snapToStart={true}
          snapToEnd={true}
        >
          {slides.map((slide, index) => (
            <View key={index} style={[styles.slide, { width: screenWidth }]}>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentSlide === index && styles.activeDot
              ]}
            />
          ))}
        </View>
        
        <Pressable 
          onPress={handleBegin}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
        >
          <Text style={styles.buttonText}>Begin</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF8FF',
  },
  imageSection: {
    height: '50%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  baseImage: {
    width: '100%',
    height: '100%',
  },
  animatedImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    height: '50%',
    alignItems: 'center',
    padding: 16,
  },
  slideContainer: {
    width: screenWidth,
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
  },
  slide: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: screenWidth,
    justifyContent: 'flex-start',
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1E40AF',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 18,
    marginBottom: 24,
    color: '#374151',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    height: 10,  // Fixed height to prevent layout shift
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#2563EB',
    width: 24,
  },
  button: {
    backgroundColor: '#2563EB',
    borderRadius: 9999,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  buttonPressed: {
    opacity: 0.8,
    backgroundColor: '#1D4ED8',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

