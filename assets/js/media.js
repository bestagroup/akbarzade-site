'use strict';
(() => {
  const root = document.querySelector('[data-media-collection]');
  if (!root) return;
  const kind = root.dataset.mediaCollection;
  const items = window.siteMedia && window.siteMedia[kind];
  if (!Array.isArray(items)) return;
  const localAsset = (value, extensions) => {
    if (typeof value !== 'string' || !/^assets\/media\//.test(value) || value.includes('..') || value.includes('\\')) return null;
    try {
      const url = new URL(value, window.location.href);
      if (url.origin !== window.location.origin || url.search || url.hash || !extensions.test(url.pathname)) return null;
      return url.href;
    } catch { return null; }
  };
  const images = /\.(?:png|jpe?g|webp|avif)$/i;
  const videos = /\.(?:mp4|webm)$/i;
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    if (!item || typeof item.title !== 'string' || !item.title.trim()) return;
    const src = localAsset(item.src, kind === 'videos' ? videos : images);
    if (!src) return;
    const figure = document.createElement('figure');
    figure.className = 'media-card' + (kind === 'appreciations' ? ' is-certificate' : '');
    if (kind === 'videos') {
      const video = document.createElement('video');
      video.controls = true;
      video.preload = 'none';
      video.playsInline = true;
      video.setAttribute('aria-label', item.title);
      video.src = src;
      const poster = localAsset(item.poster, images);
      if (poster) video.poster = poster;
      const captions = localAsset(item.captions, /\.vtt$/i);
      if (captions) {
        const track = document.createElement('track');
        track.kind = 'captions';
        track.src = captions;
        track.srclang = 'fa';
        track.label = 'فارسی';
        track.default = true;
        video.append(track);
      }
      figure.append(video);
      const download = document.createElement('a');
      download.href = src;
      download.className = 'text-link';
      download.textContent = 'باز کردن فایل ویدئو';
      figure.append(download);
    } else {
      const anchor = document.createElement('a');
      anchor.href = src;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.setAttribute('aria-label', 'مشاهده تصویر کامل: ' + item.title);
      const image = document.createElement('img');
      image.src = src;
      image.alt = typeof item.alt === 'string' && item.alt.trim() ? item.alt : item.title;
      image.loading = 'lazy';
      image.decoding = 'async';
      if (Number.isInteger(item.width) && item.width > 0 && Number.isInteger(item.height) && item.height > 0) {
        image.width = item.width;
        image.height = item.height;
      }
      anchor.append(image);
      figure.append(anchor);
    }
    const caption = document.createElement('figcaption');
    const heading = document.createElement('h2');
    heading.textContent = item.title;
    caption.append(heading);
    if (typeof item.description === 'string' && item.description.trim()) {
      const description = document.createElement('p');
      description.textContent = item.description;
      caption.append(description);
    }
    if (typeof item.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(item.date)) {
      const date = new Date(item.date + 'T12:00:00Z');
      if (Number.isFinite(date.getTime()) && date.toISOString().slice(0,10) === item.date) {
        const time = document.createElement('time');
        time.dateTime = item.date;
        time.textContent = new Intl.DateTimeFormat('fa-IR', {dateStyle: 'long', timeZone:'Asia/Tehran'}).format(date);
        caption.append(time);
      }
    }
    figure.append(caption);
    fragment.append(figure);
  });
  const count = fragment.childElementCount;
  root.append(fragment);
  const empty = root.parentElement.querySelector('.media-empty');
  if (empty) empty.hidden = count > 0;
})();
