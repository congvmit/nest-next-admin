import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUserDto } from './dto/find-all-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { hashPassword } from '@/helpers/utils';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from '@/auth/dto/register.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

@ApiTags('Users')
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

  async findOne(id: number) {
    return await this.userModel
      .findOne({ _id: id })
      .select('-password')
      .select('-__v');
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    // Remove null or undefined fields
    // Object.keys(updateUserDto).forEach(
    //   (key) => updateUserDto[key] == null && delete updateUserDto[key],
    // );
    return await this.userModel.updateOne({ _id: id }, { ...updateUserDto });
  }

  async remove(id: string) {
    // Check if the user exists then remove it
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return await this.userModel.deleteOne({ _id: id });
  }

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    if (await this.isEmailExist(email)) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await hashPassword(password);
    const user = await this.userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
      codeId: uuidv4(),
      codeExpired: dayjs().add(1, 'day').toDate(),
    });

    return {
      _id: user._id,
    };
  }
}
