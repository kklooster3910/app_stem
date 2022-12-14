Photo Search!

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Type a search input into the input field and begin searching for images!

Uses Unsplash api to search for images and creates and endless scrolling effect as long as there are still images to show

## Assumptions:

- Used local state in a main component and drilled state down through props - I assumed this would be all right with a small single page app but would have liked to use context or another state management strategy if functionality were to grow. eg: liking photos, sharing photos, user Profiles, etc.
- Using Next.js as a fullstack framework. If this app were to grow in functionality I would have split the API from the frontend code bases and implemented a Node.js API using an express server and deployed via a AWS ec2 instance or other remote machine.
- I didn't write any unit/integration tests. My current employer only does QA via smoke testing and doesn't utilize any automatic code checks/testing suites or write any tests at all. I believe a good strategy for small dev teams that don't have the manpower to write their own tests is to utilize a third party application eg: ProdPerfect for full E2E testing

## TODO: A list of items I would like to implement

- Make a Types file and export all types from there to DRY up redundant typing
- App state - use context, redux, or some other form of state management instead of having a main component use local state. Would depend on use cases and size of app. I think context would be a good choice for an image search if more functionality was implemented, eg: liking photos
- Optimize/prefetch different size of images for the ImageDetails component, using the prefetch property on the Next.js Image component prefetches the ImageDetails images but still would like to try and optimize more. These images are large either way need to download but waiting for the browser to download isn't ideal
- Implement a different loading feature to show images are being fetched from the API or Next Image component hasn't downloaded the image url yet. Next Image blurDataUrl property is working on first image load and then doesn't --> need to debug further. This feature should show a blurred local image while the image downloads
- Optimize grid. I chose to keep the aspect ratio of the image source as allow the grid to have some empty white space and I would like to spend more time optimizing the grid layout so that the white space is filled better. Ideally I want the images to arrange/fill the grid in a way that optimizes white space
- Possibly optimize detection of bottom of page. I chose to fetch more photos for the infinite scroll if the user has scrolled to a certain point towards the bottom of the image grid container. I think utilizing a percentage here as opposed to being X amount of pixels from the bottom is less error prone to different view port sizes. I didn't encounter a screensize that wasn't working in testing but will revisit
- add support/styling for monitors larger than 1080p
- convert loading img and favicon to webp format
