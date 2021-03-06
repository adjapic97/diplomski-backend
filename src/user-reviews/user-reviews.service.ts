import { Injectable } from '@nestjs/common';
import { CreateUserReviewDto } from './dto/create-user-review.dto';
import { UpdateUserReviewDto } from './dto/update-user-review.dto';

@Injectable()
export class UserReviewsService {
  create(createUserReviewDto: CreateUserReviewDto) {
    // check number of reviews, call rank service to update user rank if needed 
    return 'This action adds a new userReview';
  }

  findAll() {
    return `This action returns all userReviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userReview`;
  }

  update(id: number, updateUserReviewDto: UpdateUserReviewDto) {
    return `This action updates a #${id} userReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} userReview`;
  }
}
