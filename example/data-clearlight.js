/**
 * Example script to get Data from a PH803W device
 *
 * Usage: node data.js <IP address>
 *
 * To see debug output call like: DEBUG=ph803w* node data.js <IP address>
 */

const { ClearlightDevice } = require('../index');

async function main() {
    const device = new ClearlightDevice(process.argv[2]);

    device.on('error', err => {
        console.log('Error: ' + err);
    });

    device.on('data', data => {
        // console.log('Data: ' + JSON.stringify(data));
        console.log('Data:');
        Object.entries(data).forEach(([key, value]) => {
            console.log(`  ${key}: ${value}`);
        });
    });

    device.on('connected', async () => {
        await device.login();
        await device.retrieveData();

        // try {
        //     // Set attributes
        //     await device.setAttribute({
        //         SET_HOUR: 0
        //         // PRE_TIME_FLAG: false,
        //         // RIGHT: 100
        //         // SET_TEMP: 130
        //         // PRE_TIME_MINUTE: 15
        //     });
        // } catch (e) {
        //     console.trace(e)
        // }
    });

    await device.connect();

    
}

if (process.argv.length !== 3) {
    console.log('Usage: node data.js 111.222.333.444');
    process.exit();
}

main();
