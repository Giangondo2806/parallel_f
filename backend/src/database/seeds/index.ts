import { AppDataSource } from '../data-source';
import { seedDepartments } from './departments.seed';
import { seedUsers } from './users.seed';
import { seedIdleResources } from './resources.seed';
import { seedCVFiles } from './files.seed';
import { seedUpdateHistory } from './history.seed';

export async function seedDatabase() {
  try {
    // Initialize the data source
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    console.log('🌱 Starting database seeding...');

    // Clear existing data (in reverse order of dependencies)
    console.log('🧹 Clearing existing data...');
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 0');
    await AppDataSource.query('TRUNCATE TABLE update_histories');
    await AppDataSource.query('TRUNCATE TABLE cv_files');
    await AppDataSource.query('TRUNCATE TABLE idle_resources');
    await AppDataSource.query('TRUNCATE TABLE users');
    await AppDataSource.query('TRUNCATE TABLE departments');
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 1');

    // Seed data in order of dependencies
    console.log('🏢 Seeding departments...');
    const departments = await seedDepartments();
    
    console.log('👥 Seeding users...');
    const users = await seedUsers(departments);
    
    console.log('💼 Seeding idle resources...');
    const resources = await seedIdleResources(departments, users);
    
    console.log('📄 Seeding CV files...');
    await seedCVFiles(resources, users);
    
    console.log('📋 Seeding update history...');
    await seedUpdateHistory(resources, users);

    console.log('✅ Database seeding completed successfully!');
    console.log(`   - ${departments.length} departments created`);
    console.log(`   - ${users.length} users created`);
    console.log(`   - ${resources.length} idle resources created`);
    console.log('   - CV files and update history records created');

  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

// Run seeding if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('🎉 Seeding process completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding process failed:', error);
      process.exit(1);
    });
}
