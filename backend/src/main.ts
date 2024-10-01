import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from 'app.module'
import { port } from 'configs'

// @ts-ignore
import packageJson = require('../package.json')

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    //Resolve cors
    app.enableCors({ origin: true })
    app.enableVersioning({
        type: VersioningType.URI,
    })
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            // forbidNonWhitelisted: true,
        })
    )
    await app.listen(port)
    console.log(
        `Bonbon MVP service v${packageJson.version} running on port ${port}`
    )
}

bootstrap()
