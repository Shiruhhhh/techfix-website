// Ícones SVG (estilo lucide, stroke) para categorias de gama e tipos de avaria.
// `category` mapeia gamas (phone/tablet/laptop/...); `iconKey` mapeia issue_types.icon_key da BD.

const CATEGORY_PATHS = {
  phone: '<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>',
  tablet: '<rect x="4" y="2" width="16" height="20" rx="2.5"/><path d="M11 18h2"/>',
  laptop: '<rect x="4" y="4" width="16" height="11" rx="1.5"/><path d="M2 20h20l-2-3H4l-2 3Z"/>',
  desktop: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/>',
  watch: '<rect x="7" y="7" width="10" height="10" rx="3"/><path d="M9 7l1-4h4l1 4M9 17l1 4h4l1-4"/>',
  console: '<path d="M6 9h12a4 4 0 0 1 4 4v1a3 3 0 0 1-5.4 1.8L15 14H9l-1.6 1.8A3 3 0 0 1 2 14v-1a4 4 0 0 1 4-4Z"/><path d="M7 12v-1.5M5.5 12H8.5M16 11h.01M18 13h.01"/>',
  vacuum: '<path d="M9 2v6M15 2v6M7 8h10v3a5 5 0 0 1-10 0V8ZM12 16v6"/>',
  audio: '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M16 9a4 4 0 0 1 0 6"/>',
};

const ISSUE_PATHS = {
  screen: '<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M13 6l-2.5 5 3 1.5-2 4.5"/>',
  battery: '<rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 11v2"/><path d="M5.5 10v4"/>',
  "charging-port": '<path d="M9 2v6M15 2v6M7 8h10v3a5 5 0 0 1-10 0V8ZM12 16v6"/>',
  "camera-back": '<rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.6"/><path d="M8 6l1.4-3h5.2L16 6"/>',
  "camera-front": '<rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.6"/><path d="M8 6l1.4-3h5.2L16 6"/>',
  "camera-back-lens": '<rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.6"/>',
  speaker: '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M16 9a4 4 0 0 1 0 6"/>',
  earpiece: '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M16 9a4 4 0 0 1 0 6"/>',
  microphone: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  "audio-jack": '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  "water-damage": '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/>',
  button: '<path d="M12 3v9"/><path d="M6.4 6.4a8 8 0 1 0 11.2 0"/>',
  "power-button": '<path d="M12 3v9"/><path d="M6.4 6.4a8 8 0 1 0 11.2 0"/>',
  "power-volume-button": '<path d="M12 3v9"/><path d="M6.4 6.4a8 8 0 1 0 11.2 0"/>',
  "volume-button": '<path d="M12 3v9"/><path d="M6.4 6.4a8 8 0 1 0 11.2 0"/>',
  "home-button": '<rect x="4" y="2" width="16" height="20" rx="3"/><circle cx="12" cy="18" r="1.6"/>',
  buttons: '<path d="M12 3v9"/><path d="M6.4 6.4a8 8 0 1 0 11.2 0"/>',
  "back-cover": '<rect x="6" y="2" width="12" height="20" rx="2.5"/><circle cx="12" cy="8.5" r="2"/>',
  antenna: '<path d="M12 12v9M5 7a9 9 0 0 1 14 0M8 10a5 5 0 0 1 8 0"/><circle cx="12" cy="12" r="1.5"/>',
  vibration: '<path d="M2 8v8M6 5v14M22 8v8M18 5v14"/><rect x="9" y="4" width="6" height="16" rx="2"/>',
  sensor: '<rect x="4" y="2" width="16" height="20" rx="3"/><circle cx="8" cy="6" r="1"/>',
  "proximity-sensor": '<rect x="4" y="2" width="16" height="20" rx="3"/><circle cx="8" cy="6" r="1"/>',
  cleaning: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  maintenance: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6Z"/>',
  tools: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6Z"/>',
  "technical-intervention": '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6Z"/>',
  "data-transfer": '<path d="M4 7h12l-3-3M20 17H8l3 3"/>',
  keyboard: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8"/>',
  trackpad: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 14v2"/>',
  fan: '<circle cx="12" cy="12" r="2"/><path d="M12 10c0-4 1-6 3-6s2 4-1 6M14 12c4 0 6 1 6 3s-4 2-6-1M12 14c0 4-1 6-3 6s-2-4 1-6M10 12c-4 0-6-1-6-3s4-2 6 1"/>',
  "software-update": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  "hard-drive": '<rect x="6" y="6" width="12" height="12" rx="2"/><circle cx="12" cy="12" r="2"/>',
  ssd: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
  ram: '<rect x="2" y="8" width="20" height="8" rx="1"/><path d="M6 16v2M10 16v2M14 16v2M18 16v2"/>',
  "power-supply": '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 6V4M17 6V4M9 12h6"/>',
  "logic-board": '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 4v3M15 4v3M9 17v3M15 17v3M4 9h3M4 15h3M17 9h3M17 15h3"/>',
  "face-id": '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h.01M15 9h.01M9 15c1 1 5 1 6 0"/>',
  "usb-ports": '<rect x="8" y="2" width="8" height="20" rx="2"/><path d="M11 6h2M11 18h2"/>',
  "touch-bar": '<rect x="2" y="9" width="20" height="6" rx="2"/>',
  superdrive: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2"/>',
  "click-wheel": '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>',
  "joy-con": '<rect x="4" y="6" width="6" height="12" rx="3"/><rect x="14" y="6" width="6" height="12" rx="3"/>',
};

function svg(path, size) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.85}
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: path }}
    />
  );
}

export function CategoryIcon({ category, size = 26 }) {
  return svg(CATEGORY_PATHS[category] || CATEGORY_PATHS.phone, size);
}

export function IssueIcon({ iconKey, size = 22 }) {
  return svg(ISSUE_PATHS[iconKey] || CATEGORY_PATHS.phone, size);
}
