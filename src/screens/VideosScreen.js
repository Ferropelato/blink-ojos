import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
} from 'react-native';
import { useTranslation } from '../i18n';
import { useSettings } from '../context/SettingsContext';
import { getThemeColors } from '../utils/theme';
import { VIDEOS } from '../data/videos';

const YOUTUBE_URL = 'https://www.youtube.com/watch?v=';

export default function VideosScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;
  const { settings } = useSettings();
  const theme = settings?.theme || 'dark';
  const colors = getThemeColors(theme);
  const { t, locale } = useTranslation();

  const openVideo = (youtubeId) => {
    const url = `${YOUTUBE_URL}${youtubeId}`;
    Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { maxWidth: isTablet ? 600 : '100%' }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{t.videos.title}</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>{t.videos.subtitle}</Text>
        </View>

        {VIDEOS.map((video) => {
          const title = video.title[locale] || video.title.es;
          const description = video.description[locale] || video.description.es;
          return (
            <TouchableOpacity
              key={video.id}
              style={[styles.card, { backgroundColor: colors.cardBg }]}
              onPress={() => openVideo(video.youtubeId)}
              activeOpacity={0.8}
            >
              <View style={styles.cardLeft}>
                <View style={[styles.playIcon, { backgroundColor: colors.primary }]}>
                  <Text style={styles.playText}>▶</Text>
                </View>
                <View style={styles.cardContent}>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
                  <Text style={[styles.cardDescription, { color: colors.textMuted }]} numberOfLines={2}>
                    {description}
                  </Text>
                  <Text style={[styles.cardDuration, { color: colors.textDim }]}>{video.duration}</Text>
                </View>
              </View>
              <Text style={[styles.openText, { color: colors.accent }]}>{t.videos.open}</Text>
            </TouchableOpacity>
          );
        })}

        <Text style={[styles.footer, { color: colors.textDim }]}>{t.videos.footer}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 48,
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
    lineHeight: 22,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  playText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 4,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  cardDuration: {
    fontSize: 12,
  },
  openText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
  },
  footer: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 18,
  },
});
