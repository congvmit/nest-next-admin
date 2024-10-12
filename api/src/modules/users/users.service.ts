import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUserDto } from './dto/find-all-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { hashPassword } from '@/helpers/utils';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  isEmailExist = async (email: string): Promise<boolean> => {
    const user = await this.userModel.findOne({ email });
    return !!user;
  };

  async create(createUserDto: CreateUserDto) {
    if (await this.isEmailExist(createUserDto.email)) {
      throw new BadRequestException(['Email already exists']);
    }
    const hashedPassword = await hashPassword(createUserDto.password);
    const user = await this.userModel.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      phone: createUserDto.phone,
      address: createUserDto.address,
      image: createUserDto.image,
    });
    return {
      _id: user._id,
    };
  }

  async findAll(findAllUserDto: FindAllUserDto) {
    const filter = ['name', 'email', 'phone', 'address'].reduce((acc, key) => {
      if (findAllUserDto[key]) {
        acc[key] = { $regex: findAllUserDto[key], $options: 'i' };
      }
      return acc;
    }, {});

    const totalItems = await this.userModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / findAllUserDto.pageSize);
    const skip = (findAllUserDto.currentPage - 1) * findAllUserDto.pageSize;
    const results = await this.userModel
      .find(filter)
      .skip(skip)
      .limit(findAllUserDto.pageSize)
      .select('-password')
      .select('-__v');
    return {
      results,
      totalItems,
      totalPages,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
