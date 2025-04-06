# ☺️ myCommy – Curated Living

**Discover beautifully curated objects for modern living.**  
From cozy corners to statement pieces, **myCommy** brings character and charm to every space.

---

## ✨ What is myCommy?

**myCommy** is a lifestyle-forward platform that showcases handpicked home decor and design items tailored for modern, intentional living. We believe that your space should feel like _you_ — warm, personal, and beautifully lived in.

Whether you're designing a minimalist nook or revamping an entire room, **myCommy** helps you find pieces that tell a story.

---

## 🚀 Features

- 🖼️ **Curated Collections** – Discover objects thoughtfully selected for design, sustainability, and story.
- 🛒 **Effortless Browsing** – A seamless, modern interface built for visual exploration.
- 💡 **Style Inspiration** – From editorial layouts to cozy moodboards, get inspired by real-life spaces.
- 🌐 **SEO-Optimized Sharing** – Built-in OpenGraph metadata for beautiful link previews.
- 📱 **Mobile-First** – Responsive design that looks stunning on every screen.

---

## 🛠️ Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for safety and clarity
- **Tailwind CSS** for beautiful, responsive UI
- **Custom Metadata SEO** with Open Graph + Canonical URLs
- **Image Optimization** via Next.js `Image` component

---

## 📸 Open Graph Preview

myCommy uses custom Open Graph images for enhanced social sharing:

```ts
openGraph: {
  images: [`${getCanonicalUrl()}/assets/og-image.png`],
}
```

This ensures every link looks good on Twitter, Facebook, and beyond.

---

## 📁 Project Structure

```
.
├── app/
├── components/
├── styles/
├── public/assets/
├── utils/
└── ...
```

- `app/`: App Router pages and layout
- `components/`: Reusable UI components
- `public/assets/`: Static images including OG preview
- `utils/`: Helper functions like `getCanonicalUrl`

---

## 🌿 Join the Curated Living Movement

Have an eye for design or a story to tell through space?  
We’d love to hear from you. [Start a conversation →](mailto:hello@mycommy.com)

---

> _“We shape our homes and then our homes shape us.”_ – Winston Churchill
