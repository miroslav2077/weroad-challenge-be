import { Product } from '../product/entities/product.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductsDefaultData1712063088562 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Product, {
      slug: 'jordan-360',
      name: 'Jordan 360°',
      description:
        'Jordan 360°: the perfect tour to discover the suggestive Wadi Rum desert, the ancient beauty of Petra, and much more.\n\nVisiting Jordan is one of the most fascinating things that everyone has to do once in their life.You are probably wondering "Why?". Well, that\'s easy: because this country keeps several passions! During our tour in Jordan, you can range from well-preserved archaeological masterpieces to trekkings, from natural wonders excursions to ancient historical sites, from camels trek in the desert to some time to relax.\nDo not forget to float in the Dead Sea and enjoy mineral-rich mud baths, it\'s one of the most peculiar attractions. It will be a tour like no other: this beautiful country leaves a memorable impression on everyone.',
      startingDate: '2021-11-01 00:00:00.000',
      endingDate: '2021-11-09 00:00:00.000',
      price: 199900,
      nature: 80,
      relax: 20,
      history: 90,
      culture: 30,
      party: 10,
      totalSeats: 5,
      imageUrl:
        'https://hips.hearstapps.com/hmg-prod/images/al-khazneh-in-petra-royalty-free-image-1597755295.jpg',
    });

    await queryRunner.manager.insert(Product, {
      slug: 'iceland-hunting-northern-lights',
      name: 'Iceland: hunting for the Northern Lights',
      description:
        "Why visit Iceland in winter? Because it is between October and March that this land offers the spectacle of the Northern Lights, one of the most incredible and magical natural phenomena in the world, visible only near the earth's two magnetic poles. Come with us on WeRoad to explore this land of ice and fire, full of contrasts and natural variety, where the energy of waterfalls and geysers meets the peace of the fjords... And when the ribbons of light of the aurora borealis twinkle in the sky before our enchanted eyes, we will know that we have found what we were looking for.",
      startingDate: '2021-11-01 00:00:00.000',
      endingDate: '2021-11-08 00:00:00.000',
      price: 199900,
      nature: 100,
      relax: 30,
      history: 10,
      culture: 20,
      party: 10,
      totalSeats: 5,
      imageUrl:
        'https://static.independent.co.uk/2023/05/04/10/iStock-1058181722.jpg',
    });

    await queryRunner.manager.insert(Product, {
      slug: 'united-arab-emirates',
      name: 'United Arab Emirates: from Dubai to Abu Dhabi',
      description:
        'At Dubai and Abu Dhabi everything is huge and majestic: here futuristic engineering works and modern infrastructures meet historical districts, local souks (typical bazars), desert and the sea. In this tour we’ll discover Dubai, where we’ll get on top of the highest skyscraper ever built, the Burj Khalifa. We’ll then take a walk at the Dubai Mall, the biggest mall on the planet, and we’ll spend a night in the desert, with the sight of the skyline on the horizon keeping us company. Then, it will be Abu Dhabi’s tourn! Sheik Zayed’s Grand Mosque’s white marble awaits for us to remain stoked in front of its wonderfulness, and the sea will invade us with peacefulness. UAE are all to discover, we’ll just get a taste of it, but we guarantee you’ll get quite the idea!',
      startingDate: '2022-01-03 00:00:00.000',
      endingDate: '2022-01-10 00:00:00.000',
      price: 149900,
      nature: 30,
      relax: 40,
      history: 20,
      culture: 80,
      party: 70,
      totalSeats: 5,
      imageUrl:
        'https://images.musement.com/cover/0002/45/dubai-skyline-at-dusk-jpg_header-144981.jpeg',
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
