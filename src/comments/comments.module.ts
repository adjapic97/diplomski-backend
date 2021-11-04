import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // imports: [TypeOrmModule.forFeature([Comment])],
  // exports: [TypeOrmModule],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
