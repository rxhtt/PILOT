# BCA Final Year Student Project: Custom Shopify Storefront

<div align="center">

👤 **Creator/Student:** SMEETA PANNAKAR  
🆔 **ID:** U02AJ23S0440  
🎓 **College:** Government First Grade College, Dharwad  
📚 **Course:** BCA (Bachelor of Computer Applications)  
📧 **Email:** smithapannakar704@gmail.com

</div>

_This project is a custom e-commerce storefront developed as part of the BCA final year project. It uses Shopify Hydrogen and React Router 7 to deliver a high-performance, modern headless commerce experience._

## Project Overview

This project demonstrates the implementation of a headless commerce architecture using:
- **Frontend:** React with React Router 7 (Remix)
- **Framework:** Shopify Hydrogen
- **Styling:** TailwindCSS v4
- **Deployment:** Vercel / Shopify Oxygen
- **API Integration:** Shopify Storefront API

## Features

- **Storefront API Integration:** Dynamic product and collection fetching.
- **Customer Accounts:** Integrated OAuth-based customer login.
- **Responsive Design:** Optimized for mobile, tablet, and desktop views.
- **Performance:** Server-side rendering (SSR) for fast initial load times.
- **Interactive UI:** Smooth transitions and accessible components using Radix UI.

## Deployment Instructions (Vercel)

This project is configured for deployment on Vercel. 
1. Push the code to a GitHub repository.
2. Connect the repository to Vercel.
3. Add the environment variables from your `.env` file to Vercel's Project Settings.
4. Vercel will automatically detect the build settings and deploy the app.

## Project Structure

- `/app`: Contains all React components, routes, and styles.
- `/public`: Static assets (images, icons).
- `server.ts`: The server entry point for processing requests.
- `vite.config.ts`: Vite configuration for the build process.

## Getting Started Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
  ]);

  return data({
    collections,
    weaverseData,
  });
}
```

`weaverse` is an `WeaverseClient` instance that has been injected into the app context by Weaverse. It provides a set of methods to interact with the Weaverse API.

```ts:app/lib/context.ts
// app/lib/context.ts

const hydrogenContext = createHydrogenContext({
    env,
    request,
    cache,
    waitUntil,
    session,
    i18n: getLocaleFromRequest(request),
    cart: {
      queryFragment: CART_QUERY_FRAGMENT,
    },
  });

  return {
    ...hydrogenContext,
    // declare additional Remix loader context
    weaverse: new WeaverseClient({
      ...hydrogenContext,
      request,
      cache,
      themeSchema,
      components,
    }),
  };
```

### Rendering page content

Weaverse pages is rendered using `<WeaverseContent />` component.

```tsx:app/weaverse/index.tsx
import { WeaverseHydrogenRoot } from '@weaverse/hydrogen';
import { GenericError } from '~/components/generic-error';
import { components } from './components';

export function WeaverseContent() {
  return (
    <WeaverseHydrogenRoot
      components={components}
      errorComponent={GenericError}
    />
  );
}

```

And in your route:

```tsx:routes/($locale)/_index.tsx
export default function Homepage() {
  return <WeaverseContent />;
}
```

Dead simple, right?

### Global theme settings

Weaverse global theme settings is loaded in the `root`'s loader with `context.weaverse.loadThemeSettings` function.

```tsx:root.tsx
export async function loader({request, context}: RouteLoaderArgs) {
  return defer({
    // App data...
    weaverseTheme: await context.weaverse.loadThemeSettings(),
  });
}
```

And then you can use it in your components with `useThemeSettings` hook.

```tsx:app/weaverse/components/logo.tsx
import { useThemeSettings } from '@weaverse/hydrogen';

function Logo() {
  let {logo} = useThemeSettings();

  return (
    <div className="flex items-center">
      <img src={logo} alt="Logo" />
    </div>
  );
}
```

The `App` component is wrapped with `withWeaverse` HoC in order to SSR the theme settings.

```tsx:root.tsx
import { withWeaverse } from '@weaverse/hydrogen';

function App() {
  return (
    <html lang={locale.language}>
      // App markup
    </html>
  );
}

export default withWeaverse(App);
```

### Create a Weaverse section

To create a section, you need to create a new file in [`app/sections`](app/sections) directory and register it in [`app/weaverse/components.ts`](app/weaverse/components.ts) file.

**Important:** All Weaverse sections must include `ref` as a prop (or use `forwardRef` with React prior to v19) and extend `HydrogenComponentProps`.

```tsx:app/sections/video/index.tsx
import type { HydrogenComponentProps } from '@weaverse/hydrogen';

interface VideoProps extends HydrogenComponentProps {
  ref: React.Ref<HTMLElement>
  heading: string;
  description: string;
  videoUrl: string;
}

export default function Video(props: VideoProps) {
  const { ref, heading, description, videoUrl, ...rest } = props;
  return (
    <section ref={ref} {...rest}>
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-12 lg:py-16 sm:text-center">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900">
          {heading}
        </h2>
        <p className="font-light text-gray-500 sm:text-lg md:px-20 lg:px-38 xl:px-48">
          {description}
        </p>
        <iframe
          className="mx-auto mt-8 h-64 w-full max-w-2xl rounded-lg lg:mt-12 sm:h-96"
          src={videoUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
});
```

Export a `schema` object from the file to define the component's schema with default data and settings to be used in the **Weaverse Studio**.

```tsx:app/sections/video/index.tsx (continued)
export const schema = createSchema({
  type: 'video',
  title: 'Video',
  settings: [
    {
      group: 'Video',
      inputs: [
        {
          type: 'text',
          name: 'heading',
          label: 'Heading',
          defaultValue: 'Learn More About Our Products',
          placeholder: 'Learn More About Our Products',
        },
        {
          type: 'textarea',
          name: 'description',
          label: 'Description',
          defaultValue: `Watch these short videos to see our products in action. Learn how to use them and what makes them special. See demos of our products being used in real-life situations. The videos provide extra details and showcase the full capabilities of what we offer. If you're interested in learning more before you buy, be sure to check out these informative product videos.`,
          placeholder: 'Video description',
        },
        {
          type: 'text',
          name: 'videoUrl',
          label: 'Video URL',
          defaultValue: 'https://www.youtube.com/embed/-akQyQN8rYM',
          placeholder: 'https://www.youtube.com/embed/-akQyQN8rYM',
        },
      ],
    },
  ],
});
```

What if your component needs to fetch data from Shopify API or any third-party API?

**Weaverse** provide a powerful `loader` function to fetch data from _any_ API, and it's run on the **server-side** 🤯😎.

Just export a `loader` function from your component:

```tsx:app/sections/video/index.tsx (loader example)
import type { ComponentLoaderArgs } from '@weaverse/hydrogen';

export const loader = async ({ weaverse, data }: ComponentLoaderArgs) => {
  const result = await weaverse.storefront.query<SeoCollectionContentQuery>(
    HOMEPAGE_SEO_QUERY,
    {
      variables: { handle: data.collection.handle || 'frontpage' },
    },
  );
  return result.data;
};
```

And then you can use the data in your component with `Component.props.loaderData` 🤗

Don't forget to register your new section in `app/weaverse/components.ts`:

```typescript
import * as Video from "~/sections/video";

export const components: HydrogenComponent[] = [
  // ... existing components
  Video,
];
```

### Manage content and style your pages within Weaverse Studio

Weaverse provides a convenient way to customize your theme inside the **Weaverse Studio**. You can add new sections, customize existing ones, and change the theme settings.

![Pilot in Weaverse Studio](https://cdn.shopify.com/s/files/1/0838/0052/3057/files/pilot-in-weaverse-studio.png?v=1755247352)

### Project Structure

```
app/
├── components/     # Reusable UI components
├── sections/       # Weaverse sections/components
├── routes/         # React Router routes (with locale prefix)
├── graphql/        # GraphQL queries and fragments
├── utils/          # Helper functions
└── weaverse/       # Weaverse configuration

Key configuration files:
- biome.json                  # Code formatting and linting
- codegen.ts                  # GraphQL code generation
- react-router.config.ts      # React Router configuration
- vite.config.ts              # Vite bundler configuration
```

### Development Tools

- **Development server**: http://localhost:3456
- **GraphiQL API browser**: http://localhost:3456/graphiql
- **Network inspector**: http://localhost:3456/debug-network
- **Weaverse Studio**: Access through your Shopify admin

## References

- [Weaverse docs](https://weaverse.io/docs)
- [Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Biome](https://biomejs.dev/)

## License

This project is provided under the [MIT License](LICENSE).

---

Let **Weaverse** & **Pilot** empower your Shopify store with top-notch performance and unmatched customization possibilities! 🚀
