import cron from 'node-cron';
import { fetchAsteroidData } from './nasaFetcher.js';
import Asteroid from '../models/Asteroid.js'; // <--- Import the Model

export const initScheduler = () => {
  // -------------------------------------------------------
  // Task 1: Data Refresh (Runs every 4 hours)
  // -------------------------------------------------------
  cron.schedule('0 */4 * * *', async () => {
    console.log('🔄 Cron: Refreshing Asteroid Data from NASA...');
    await fetchAsteroidData();
  });

  // -------------------------------------------------------
  // Task 2: Daily Risk Alert (Runs every day at 09:00 AM)
  // -------------------------------------------------------
  cron.schedule('0 9 * * *', async () => {
    console.log('⏰ Cron: Running Daily Risk Analysis...');
    
    try {
      // Get today's date in YYYY-MM-DD format to match your DB
      const today = new Date().toISOString().split('T')[0];

      // Query DB for critical threats approaching today
      const hazardous = await Asteroid.find({ 
        riskScore: { $gt: 75 },
        approachDate: today 
      });

      if (hazardous.length > 0) {
        // 🚨 LOG THE ALERT (This fulfills the requirement)
        console.log(`\n🚨🚨🚨 ALERT: ${hazardous.length} CRITICAL ASTEROIDS DETECTED TODAY! 🚨🚨🚨`);
        hazardous.forEach(ast => {
          console.log(`   - ☄️  ${ast.name}`);
          console.log(`     Risk Score: ${ast.riskScore}/100`);
          console.log(`     Distance: ${ast.distance.toLocaleString()} km`);
          console.log(`     Velocity: ${ast.velocity.toLocaleString()} km/h\n`);
        });
      } else {
        console.log('✅ Daily Check Complete: No critical threats detected for today.');
      }
    } catch (err) {
      console.error('❌ Alert Check Failed:', err.message);
    }
  });
  
  fetchAsteroidData();
};