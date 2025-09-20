---#!/usr/bin/env bash set -euo pipefail

Social Media MVP Starter (Next.js + NestJS + Postgres + MinIO + Redis)

One-shot generator script — run it in an empty folder:

bash generate_social_mvp.sh

ROOT_DIR=${1:-social-mvp-starter} mkdir -p "$ROOT_DIR" cd "$ROOT_DIR"

mkdir -p apps/api/src/modules/{auth,posts,users} apps/api/src/routes packages/db/prisma apps/web/app/api/health

---------------- root files ----------------

cat > README.md <<'EOF'

Social Media MVP Starter (Next.js + NestJS + Postgres + MinIO + Redis)

A pragmatic starter kit for a lightweight social network.

Stack

Web: Next.js (App Router), TypeScript, Tailwind

API: NestJS (TypeScript), JWT Auth

DB: PostgreSQL + Prisma

Media: MinIO (S3-compatible) + Cloudfront/Cloudflare (later)

Jobs/Cache: Redis (BullMQ)

Dev: Docker Compose, Node 20


Quickstart

1. Start infra:



docker compose up -d db redis minio

2. Init DB:



cd packages/db
npm i
npx prisma generate
npx prisma migrate dev --name init

3. Run API:



cd ../../apps/api
npm i
npm run start:dev

4. Run Web:



cd ../web
npm i
npm run dev

Open http://localhost:3000 (Web) and http://localhost:4000/api/health (API). EOF

cat > .gitignore <<'EOF' .env node_modules .next dist .prisma coverage .DS_Store tmp *.log EOF

cat > docker-compose.yml <<'EOF' version: "3.9" services: db: image: postgres:16 restart: unless-stopped environment: POSTGRES_USER: app POSTGRES_PASSWORD: app POSTGRES_DB: app ports: ["5432:5432"] volumes: - db_data:/var/lib/postgresql/data

redis: image: redis:7 restart: unless-stopped ports: ["6379:6379"]

minio: image: minio/minio:latest command: server /data --console-address ":9001" environment: MINIO_ROOT_USER: minio MINIO_ROOT_PASSWORD: minio12345 ports: - "9000:9000" - "9001:9001" volumes: - minio_data:/data

volumes: db_data: minio_data: EOF

---------------- packages/db ----------------

cat > packages/db/package.json <<'EOF' { "name": "@app/db", "version": "0.1.0", "private": true, "scripts": { "generate": "prisma generate", "migrate": "prisma migrate dev", "studio": "prisma studio" }, "dependencies": { "@prisma/client": "^5.18.0", "dotenv": "^16.4.5" }, "devDependencies": { "prisma": "^5.18.0", "typescript": "^5.4.0" } } EOF

cat > packages/db/.env.example <<'EOF' DATABASE_URL=postgresql://app:app@localhost:5432/app?schema=public EOF

cat > packages/db/prisma/schema.prisma <<'EOF' // Prisma schema for MVP generator client { provider = "prisma-client-js" }

datasource db { provider = "postgresql" url      = env("DATABASE_URL") }

model User { id           String   @id @default(cuid()) handle       String   @unique email        String   @unique passwordHash String name         String? bio          String? avatarUrl    String? createdAt    DateTime @default(now())

posts        Post[] likes        Like[] comments     Comment[]

followers    Follow[] @relation("followers") following    Follow[] @relation("following") }

model Follow { id        String   @id @default(cuid()) follower  User     @relation("following", fields: [followerId], references: [id]) followerId String followee  User     @relation("followers", fields: [followeeId], references: [id]) followeeId String createdAt DateTime @default(now())

@@unique([followerId, followeeId]) }

model Post { id        String   @id @default(cuid()) user      User     @relation(fields: [userId], references: [id]) userId    String type      PostType text      String? mediaUrl  String? hlsUrl    String? duration  Int? nsfw      Boolean  @default(false) createdAt DateTime @default(now())

likes     Like[] comments  Comment[] reports   Report[] tags      PostTag[] }

enum PostType { TEXT PHOTO VIDEO }

model Like { id        String   @id @default(cuid()) user      User     @relation(fields: [userId], references: [id]) userId    String post      Post     @relation(fields: [postId], references: [id]) postId    String createdAt DateTime @default(now())

@@unique([userId, postId]) }

model Comment { id        String   @id @default(cuid()) post      Post     @relation(fields: [postId], references: [id]) postId    String user      User     @relation(fields: [userId], references: [id]) userId    String text      String parentId  String? createdAt DateTime @default(now()) isHidden  Boolean  @default(false) }

model Report { id        String   @id @default(cuid()) target    String   // "post:{id}" | "user:{id}" | "comment:{id}" reason    String notes     String? status    ReportStatus @default(PENDING) createdAt DateTime @default(now()) }

enum ReportStatus { PENDING RESOLVED REJECTED }

model Hashtag { id   String @id @default(cuid()) tag  String @unique posts PostTag[] }

model PostTag { id       String  @id @default(cuid()) post     Post    @relation(fields: [postId], references: [id]) postId   String hashtag  Hashtag @relation(fields: [hashtagId], references: [id]) hashtagId String @@unique([postId, hashtagId]) } EOF

---------------- apps/api ----------------

cat > apps/api/package.json <<'EOF' { "name": "@app/api", "version": "0.1.0", "private": true, "scripts": { "start": "nest start", "start:dev": "nest start --watch", "build": "nest build", "lint": "eslint ." }, "dependencies": { "@nestjs/common": "^10.0.0", "@nestjs/core": "^10.0.0", "@nestjs/platform-express": "^10.0.0", "@nestjs/jwt": "^10.2.0", "argon2": "^0.40.1", "class-transformer": "^0.5.1", "class-validator": "^0.14.0", "cookie-parser": "^1.4.6", "cors": "^2.8.5", "dotenv": "^16.4.5", "express-rate-limit": "^7.4.0", "@prisma/client": "^5.18.0" }, "devDependencies": { "@nestjs/cli": "^10.0.0", "@nestjs/schematics": "^10.0.0", "@nestjs/testing": "^10.0.0", "@types/express": "^4.17.21", "eslint": "^8.57.0", "ts-node": "^10.9.2", "typescript": "^5.4.0", "prisma": "^5.18.0" } } EOF

cat > apps/api/tsconfig.json <<'EOF' { "compilerOptions": { "module": "commonjs", "declaration": true, "removeComments": true, "emitDecoratorMetadata": true, "experimentalDecorators": true, "allowSyntheticDefaultImports": true, "target": "ES2021", "sourceMap": true, "outDir": "./dist", "baseUrl": "./", "incremental": true } } EOF

cat > apps/api/.env.example <<'EOF' PORT=4000 JWT_SECRET=change_me DATABASE_URL=postgresql://app:app@localhost:5432/app?schema=public S3_ENDPOINT=http://localhost:9000 S3_REGION=us-east-1 S3_ACCESS_KEY=minio S3_SECRET_KEY=minio12345 S3_BUCKET=media RATE_LIMIT_WINDOW_MS=60000 RATE_LIMIT_MAX=120 EOF

cat > apps/api/src/main.ts <<'EOF' import { NestFactory } from '@nestjs/core'; import { AppModule } from './modules/app.module'; import * as cookieParser from 'cookie-parser'; import rateLimit from 'express-rate-limit';

async function bootstrap() { const app = await NestFactory.create(AppModule); app.enableCors({ origin: true, credentials: true }); app.use(cookieParser()); app.use(rateLimit({ windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000), max: Number(process.env.RATE_LIMIT_MAX || 120) })); await app.listen(process.env.PORT || 4000); console.log(API running on http://localhost:${process.env.PORT || 4000}); } bootstrap(); EOF

cat > apps/api/src/modules/app.module.ts <<'EOF' import { Module } from '@nestjs/common'; import { ConfigModule } from '@nestjs/config'; import { PrismaService } from './prisma.service'; import { HealthController } from '../routes/health.controller'; import { AuthModule } from './auth/auth.module'; import { UsersModule } from './users/users.module'; import { PostsModule } from './posts/posts.module';

@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UsersModule, PostsModule], controllers: [HealthController], providers: [PrismaService], }) export class AppModule {} EOF

cat > apps/api/src/modules/prisma.service.ts <<'EOF' import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'; import { PrismaClient } from '@prisma/client';

@Injectable() export class PrismaService extends PrismaClient implements OnModuleInit { async onModuleInit() { await this.$connect(); } async enableShutdownHooks(app: INestApplication) { this.$on('beforeExit', async () => { await app.close(); }); } } EOF

cat > apps/api/src/modules/auth/auth.module.ts <<'EOF' import { Module } from '@nestjs/common'; import { JwtModule } from '@nestjs/jwt'; import { AuthService } from './auth.service'; import { AuthController } from '../../routes/auth.controller'; import { PrismaService } from '../prisma.service';

@Module({ imports: [JwtModule.register({ global: true, secret: process.env.JWT_SECRET || 'dev' })], controllers: [AuthController], providers: [AuthService, PrismaService], }) export class AuthModule {} EOF

cat > apps/api/src/modules/auth/auth.service.ts <<'EOF' import { Injectable, UnauthorizedException } from '@nestjs/common'; import { PrismaService } from '../prisma.service'; import * as argon2 from 'argon2'; import { JwtService } from '@nestjs/jwt';

@Injectable() export class AuthService { constructor(private prisma: PrismaService, private jwt: JwtService) {}

async register(email: string, password: string, handle: string) { const passwordHash = await argon2.hash(password); const user = await this.prisma.user.create({ data: { email, passwordHash, handle } }); return this.sign(user.id); }

async login(email: string, password: string) { const user = await this.prisma.user.findUnique({ where: { email } }); if (!user) throw new UnauthorizedException('Invalid credentials'); const ok = await argon2.verify(user.passwordHash, password); if (!ok) throw new UnauthorizedException('Invalid credentials'); return this.sign(user.id); }

sign(userId: string) { const access = this.jwt.sign({ sub: userId }, { expiresIn: '15m' }); const refresh = this.jwt.sign({ sub: userId, type: 'refresh' }, { expiresIn: '7d' }); return { access, refresh }; } } EOF

cat > apps/api/src/modules/users/users.module.ts <<'EOF' import { Module } from '@nestjs/common'; import { PrismaService } from '../prisma.service'; import { UsersController } from '../../routes/users.controller';

@Module({ controllers: [UsersController], providers: [PrismaService] }) export class UsersModule {} EOF

cat > apps/api/src/modules/posts/posts.module.ts <<'EOF' import { Module } from '@nestjs/common'; import { PrismaService } from '../prisma.service'; import { PostsController } from '../../routes/posts.controller';

@Module({ controllers: [PostsController], providers: [PrismaService] }) export class PostsModule {} EOF

cat > apps/api/src/routes/health.controller.ts <<'EOF' import { Controller, Get } from '@nestjs/common';

@Controller('/api/health') export class HealthController { @Get() ping() { return { ok: true, ts: Date.now() }; } } EOF

cat > apps/api/src/routes/auth.controller.ts <<'EOF' import { Body, Controller, Post } from '@nestjs/common'; import { AuthService } from '../modules/auth/auth.service';

@Controller('/api/auth') export class AuthController { constructor(private auth: AuthService) {}

@Post('register') register(@Body() body: { email: string; password: string; handle: string; }) { return this.auth.register(body.email, body.password, body.handle); }

@Post('login') login(@Body() body: { email: string; password: string; }) { return this.auth.login(body.email, body.password); } } EOF

cat > apps/api/src/routes/users.controller.ts <<'EOF' import { Controller, Get, Param } from '@nestjs/common'; import { PrismaService } from '../modules/prisma.service';

@Controller('/api/users') export class UsersController { constructor(private prisma: PrismaService) {}

@Get(':handle') async getByHandle(@Param('handle') handle: string) { const user = await this.prisma.user.findUnique({ where: { handle } }); return user ? { id: user.id, handle: user.handle, name: user.name, bio: user.bio, avatarUrl: user.avatarUrl } : null; } } EOF

cat > apps/api/src/routes/posts.controller.ts <<'EOF' import { Body, Controller, Get, Param, Post } from '@nestjs/common'; import { PrismaService } from '../modules/prisma.service';

@Controller('/api/posts') export class PostsController { constructor(private prisma: PrismaService) {}

@Post() async create(@Body() body: { userId: string; type: 'TEXT'|'PHOTO'|'VIDEO'; text?: string; mediaUrl?: string; }) { return this.prisma.post.create({ data: { userId: body.userId, type: body.type, text: body.text, mediaUrl: body.mediaUrl } }); }

@Get(':id') async get(@Param('id') id: string) { return this.prisma.post.findUnique({ where: { id } }); } } EOF

---------------- apps/web ----------------

cat > apps/web/package.json <<'EOF' { "name": "@app/web", "version": "0.1.0", "private": true, "scripts": { "dev": "next dev", "build": "next build", "start": "next start" }, "dependencies": { "next": "14.2.5", "react": "18.3.1", "react-dom": "18.3.1", "swr": "^2.2.5" }, "devDependencies": { "typescript": "^5.4.0", "@types/react": "^18.2.66", "@types/node": "^20.12.12" } } EOF

cat > apps/web/next.config.js <<'EOF' module.exports = { reactStrictMode: true }; EOF

cat > apps/web/tsconfig.json <<'EOF' { "compilerOptions": { "target": "ES2021", "lib": ["dom", "dom.iterable", "es2021"], "allowJs": true, "skipLibCheck": true, "strict": false, "forceConsistentCasingInFileNames": true, "noEmit": true, "esModuleInterop": true, "module": "esnext", "moduleResolution": "bundler", "resolveJsonModule": true, "isolatedModules": true, "jsx": "preserve" }, "include": ["next-env.d.ts", "/*.ts", "/*.tsx"], "exclude": ["node_modules"] } EOF

cat > apps/web/next-env.d.ts <<'EOF' /// <reference types="next" /> /// <reference types="next/image-types/global" /> EOF

cat > apps/web/.env.example <<'EOF' NEXT_PUBLIC_API_URL=http://localhost:4000 EOF

mkdir -p apps/web/app cat > apps/web/app/layout.tsx <<'EOF' export default function RootLayout({ children }: { children: React.ReactNode }) { return ( <html lang="en"> <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0 }}>{children}</body> </html> ); } EOF

cat > apps/web/app/page.tsx <<'EOF' 'use client'; import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Home() { const { data } = useSWR('/api/health', fetcher, { refreshInterval: 5000 }); return ( <main style={{ padding: 24 }}> <h1>Social Media MVP</h1> <p>Welcome! This is a minimal Next.js frontend.</p> <pre>API Health: {JSON.stringify(data)}</pre> </main> ); } EOF

mkdir -p apps/web/app/api/health cat > apps/web/app/api/health/route.ts <<'EOF' import { NextResponse } from 'next/server';

export async function GET() { // Proxy example; adjust to call real API return NextResponse.json({ ok: true, ts: Date.now() }); } EOF

Done

cat <<'EOF' echo Generation complete! Next steps:

1. docker compose up -d db redis minio


2. cd packages/db && cp .env.example .env && npm i && npx prisma generate && npx prisma migrate dev --name init


3. cd ../../apps/api && cp .env.example .env && npm i && npm run start:dev


4. cd ../web && cp .env.example .env && npm i && npm run dev EOF




id: the-basics
title: The Basics
sidebar_label: The Basics
slug: /
---

## Put a locally running HTTP, HTTPS or TLS app on the internet

localhost.run is a client-less tool to instantly make a locally running application available on an internet accessible URL.

All major operating systems already have SSH installed, and localhost.run uses SSH as a client, so no download is necessary to use the service and no account setup is needed for free domains.

To connect an internet domain to an application running locally on port 8080 open a command terminal and run:

```bash
ssh -R 80:localhost:8080 localhost.run
```

import { useState } from 'react'

export const PortChooser = () => {
  const [port, setPort] = useState(3000);
  return (
    <>
      running on&nbsp;
      <label for="port">local port</label>
      &nbsp;
      <input style={{width: "5em"}} type="number" id="port" name="port" min="1" max="65535" value={port} onChange={(event) => setPort(event.target.value)} />
      ?
      use this command:
      <pre><code parentName="pre" {...{
              "className": "bash"
            }}>{`ssh -R 80:localhost:${port} localhost.run
`}</code></pre>
    </>
  )
};

<PortChooser />
