import { ProductRepository } from '@/domain/product/application/repositories/product-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.services'
import { PaginationParams } from '@/cors/repositories/pagination-params'
import { Product } from '@/domain/product/enterprise/entities/Product'
import { PrismaProductMapper } from '../mappers/prisma-product-mapper'

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<Product | null> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    })

    if (!product) {
      return null
    }
    return PrismaProductMapper.toDomain(product)
  }

  async create(product: Product) {
    const data = PrismaProductMapper.toPersisten(product)
    await this.prismaService.product.create({
      data,
    })
  }

  async findMany({ page, limit }: PaginationParams): Promise<Product[]> {
    const products = await this.prismaService.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
    })
    return products.map(PrismaProductMapper.toDomain)
  }

  async save(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPersisten(product)
    await this.prismaService.product.update({
      where: { id: data.id },
      data,
    })
  }

  async delete(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPersisten(product)
    await this.prismaService.product.delete({
      where: {
        id: data.id,
      },
    })
  }
}
