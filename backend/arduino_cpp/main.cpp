#include <iostream>
#include <math.h>
using namespace std;

// Include arduPi library
#include "./libraries/arduPi/arduPi.h"

// arduino pi documentation:
// https://www.cooking-hacks.com/documentation/tutorials/raspberry-pi-to-arduino-shields-connection-bridge.html

/*********************************************************
 *  IF YOUR ARDUINO CODE HAS OTHER FUNCTIONS APART FROM  *
 *  setup() AND loop() YOU MUST DECLARE THEM HERE        *
 * *******************************************************/

/**************************
 * YOUR ARDUINO CODE HERE *
 * ************************/

/****************************************************************
 * Example6_DMP_Quat9_Orientation.ino
 * ICM 20948 Arduino Library Demo
 * Initialize the DMP based on the TDK InvenSense ICM20948_eMD_nucleo_1.0 example-icm20948
 * Paul Clark, April 25th, 2021
 * Based on original code by:
 * Owen Lyke @ SparkFun Electronics
 * Original Creation Date: April 17 2019
 *
 * ** This example is based on InvenSense's _confidential_ Application Note "Programming Sequence for DMP Hardware Functions".
 * ** We are grateful to InvenSense for sharing this with us.
 *
 * ** Important note: by default the DMP functionality is disabled in the library
 * ** as the DMP firmware takes up 14301 Bytes of program memory.
 * ** To use the DMP, you will need to:
 * ** Edit ICM_20948_C.h
 * ** Uncomment line 29: #define ICM_20948_USE_DMP
 * ** Save changes
 * ** If you are using Windows, you can find ICM_20948_C.h in:
 * ** Documents\Arduino\libraries\SparkFun_ICM-20948_ArduinoLibrary\src\util
 *
 * Please see License.md for the license information.
 *
 * Distributed as-is; no warranty is given.
 ***************************************************************/

#define QUAT_ANIMATION // Uncomment this line to output data in the correct format for ZaneL's Node.js Quaternion animation tool: https://github.com/ZaneL/quaternion_sensor_3d_nodejs

#include "./libraries/SparkFun_9DoF_IMU_Breakout_-_ICM_20948_-_Arduino_Library/src/ICM_20948.h" // Click here to get the library: http://librarymanager/All#SparkFun_ICM_20948_IMU

#define AD0_VAL 1      // The value of the last bit of the I2C address.                \
                       // On the SparkFun 9DoF IMU breakout the default is 1, and when \
                       // the ADR jumper is closed the value becomes 0

ICM_20948_I2C myICM; // Otherwise create an ICM_20948_I2C object

void setup()
{


    delay(2000);
#ifndef QUAT_ANIMATION
    cout << "ICM-20948 Example" << endl;
#endif

    delay(100);

#ifdef USE_SPI
    SPI_PORT.begin();
#else
    Wire.begin();
    // Wire.setClock(400000);
#endif

#ifndef QUAT_ANIMATION
    // myICM.enableDebugging(); // Uncomment this line to enable helpful debug messages on Serial
#endif

    bool initialized = false;
    while (!initialized)
    {

        // Initialize the ICM-20948
        // If the DMP is enabled, .begin performs a minimal startup. We need to configure the sample mode etc. manually.
#ifdef USE_SPI
        myICM.begin(CS_PIN, SPI_PORT);
#else
        myICM.begin(Wire, AD0_VAL);
#endif

#ifndef QUAT_ANIMATION
        cout << "Initialization of the sensor returned: ";
        SERIAL_PORT.println(myICM.statusString());
#endif
        if (myICM.status != ICM_20948_Stat_Ok)
        {
#ifndef QUAT_ANIMATION
            cout << "Trying again..." << endl;
#endif
            delay(500);
        }
        else
        {
            initialized = true;
        }
    }

#ifndef QUAT_ANIMATION
    cout << "Device connected!" << endl;
#endif

    bool success = true; // Use success to show if the DMP configuration was successful

    // Initialize the DMP. initializeDMP is a weak function. You can overwrite it if you want to e.g. to change the sample rate
    success &= (myICM.initializeDMP() == ICM_20948_Stat_Ok);

    // DMP sensor options are defined in ICM_20948_DMP.h
    //    INV_ICM20948_SENSOR_ACCELEROMETER               (16-bit accel)
    //    INV_ICM20948_SENSOR_GYROSCOPE                   (16-bit gyro + 32-bit calibrated gyro)
    //    INV_ICM20948_SENSOR_RAW_ACCELEROMETER           (16-bit accel)
    //    INV_ICM20948_SENSOR_RAW_GYROSCOPE               (16-bit gyro + 32-bit calibrated gyro)
    //    INV_ICM20948_SENSOR_MAGNETIC_FIELD_UNCALIBRATED (16-bit compass)
    //    INV_ICM20948_SENSOR_GYROSCOPE_UNCALIBRATED      (16-bit gyro)
    //    INV_ICM20948_SENSOR_STEP_DETECTOR               (Pedometer Step Detector)
    //    INV_ICM20948_SENSOR_STEP_COUNTER                (Pedometer Step Detector)
    //    INV_ICM20948_SENSOR_GAME_ROTATION_VECTOR        (32-bit 6-axis quaternion)
    //    INV_ICM20948_SENSOR_ROTATION_VECTOR             (32-bit 9-axis quaternion + heading accuracy)
    //    INV_ICM20948_SENSOR_GEOMAGNETIC_ROTATION_VECTOR (32-bit Geomag RV + heading accuracy)
    //    INV_ICM20948_SENSOR_GEOMAGNETIC_FIELD           (32-bit calibrated compass)
    //    INV_ICM20948_SENSOR_GRAVITY                     (32-bit 6-axis quaternion)
    //    INV_ICM20948_SENSOR_LINEAR_ACCELERATION         (16-bit accel + 32-bit 6-axis quaternion)
    //    INV_ICM20948_SENSOR_ORIENTATION                 (32-bit 9-axis quaternion + heading accuracy)

    // Enable the DMP orientation sensor
    success &= (myICM.enableDMPSensor(INV_ICM20948_SENSOR_ORIENTATION) == ICM_20948_Stat_Ok);

    // Enable any additional sensors / features
    // success &= (myICM.enableDMPSensor(INV_ICM20948_SENSOR_RAW_GYROSCOPE) == ICM_20948_Stat_Ok);
    // success &= (myICM.enableDMPSensor(INV_ICM20948_SENSOR_RAW_ACCELEROMETER) == ICM_20948_Stat_Ok);
    // success &= (myICM.enableDMPSensor(INV_ICM20948_SENSOR_MAGNETIC_FIELD_UNCALIBRATED) == ICM_20948_Stat_Ok);

    // Configuring DMP to output data at multiple ODRs:
    // DMP is capable of outputting multiple sensor data at different rates to FIFO.
    // Setting value can be calculated as follows:
    // Value = (DMP running rate / ODR ) - 1
    // E.g. For a 5Hz ODR rate when DMP is running at 55Hz, value = (55/5) - 1 = 10.
    success &= (myICM.setDMPODRrate(DMP_ODR_Reg_Quat9, 0) == ICM_20948_Stat_Ok); // Set to the maximum
    // success &= (myICM.setDMPODRrate(DMP_ODR_Reg_Accel, 0) == ICM_20948_Stat_Ok); // Set to the maximum
    // success &= (myICM.setDMPODRrate(DMP_ODR_Reg_Gyro, 0) == ICM_20948_Stat_Ok); // Set to the maximum
    // success &= (myICM.setDMPODRrate(DMP_ODR_Reg_Gyro_Calibr, 0) == ICM_20948_Stat_Ok); // Set to the maximum
    // success &= (myICM.setDMPODRrate(DMP_ODR_Reg_Cpass, 0) == ICM_20948_Stat_Ok); // Set to the maximum
    // success &= (myICM.setDMPODRrate(DMP_ODR_Reg_Cpass_Calibr, 0) == ICM_20948_Stat_Ok); // Set to the maximum

    // Enable the FIFO
    success &= (myICM.enableFIFO() == ICM_20948_Stat_Ok);

    // Enable the DMP
    success &= (myICM.enableDMP() == ICM_20948_Stat_Ok);

    // Reset DMP
    success &= (myICM.resetDMP() == ICM_20948_Stat_Ok);

    // Reset FIFO
    success &= (myICM.resetFIFO() == ICM_20948_Stat_Ok);

    // Check success
    if (success)
    {
#ifndef QUAT_ANIMATION
        cout << "DMP enabled!" << endl;
#endif
    }
    else
    {
        cout << "Enable DMP failed!" << endl;
        cout << "Please check that you have uncommented line 29 (#define ICM_20948_USE_DMP) in ICM_20948_C.h..." << endl;
        while (1)
            ; // Do nothing more
    }
}

void loop()
{
    // Read any DMP data waiting in the FIFO
    // Note:
    //    readDMPdataFromFIFO will return ICM_20948_Stat_FIFONoDataAvail if no data is available.
    //    If data is available, readDMPdataFromFIFO will attempt to read _one_ frame of DMP data.
    //    readDMPdataFromFIFO will return ICM_20948_Stat_FIFOIncompleteData if a frame was present but was incomplete
    //    readDMPdataFromFIFO will return ICM_20948_Stat_Ok if a valid frame was read.
    //    readDMPdataFromFIFO will return ICM_20948_Stat_FIFOMoreDataAvail if a valid frame was read _and_ the FIFO contains more (unread) data.
    icm_20948_DMP_data_t data;
    myICM.readDMPdataFromFIFO(&data);

    if ((myICM.status == ICM_20948_Stat_Ok) || (myICM.status == ICM_20948_Stat_FIFOMoreDataAvail)) // Was valid data available?
    {
        // cout << "Received data! Header: 0x"; // Print the header in HEX so we can see what data is arriving in the FIFO
        // if ( data.header < 0x1000) cout <<  "0" ; // Pad the zeros
        // if ( data.header < 0x100) cout <<  "0" ;
        // if ( data.header < 0x10) cout <<  "0" ;
        // SERIAL_PORT.println( data.header, HEX );

        if ((data.header & DMP_header_bitmap_Quat9) > 0) // We have asked for orientation data so we should receive Quat9
        {
            // Q0 value is computed from this equation: Q0^2 + Q1^2 + Q2^2 + Q3^2 = 1.
            // In case of drift, the sum will not add to 1, therefore, quaternion data need to be corrected with right bias values.
            // The quaternion data is scaled by 2^30.

            // SERIAL_PORT.printf("Quat9 data is: Q1:%ld Q2:%ld Q3:%ld Accuracy:%d\r\n", data.Quat9.Data.Q1, data.Quat9.Data.Q2, data.Quat9.Data.Q3, data.Quat9.Data.Accuracy);

            // Scale to +/- 1
            double q1 = ((double)data.Quat9.Data.Q1) / 1073741824.0; // Convert to double. Divide by 2^30
            double q2 = ((double)data.Quat9.Data.Q2) / 1073741824.0; // Convert to double. Divide by 2^30
            double q3 = ((double)data.Quat9.Data.Q3) / 1073741824.0; // Convert to double. Divide by 2^30
            double q0 = 0.0;                                         // sqrt(1.0 - ((q1 * q1) + (q2 * q2) + (q3 * q3)));

            // convert Tait-Bryan XYZ (commonly called Euler angles) to
            // a quaternion. 'revision_1_fma_s' in toy code
            // http://marc-b-reynolds.github.io/math/2017/04/18/TaitEuler.html

            // double w = q0;
            // double x = q1;
            // double y = q2;
            // double z = q3;

            // double t0 = (x + z) * (x - z); // x^2-z^2
            // double t1 = (w + y) * (w - y); // w^2-y^2
            // double xx = 0.5f * (t0 + t1);
            // double xy = f32_mma(x, y, w, z);
            // double xz = f32_mms(w, y, x, z);
            // double yz = 2.f * (f32_mma(y, z, w, x));
            // double t = xx * xx + xy * xy;

            // double yaw = atan2f(xy, xx);
            // double pitch = atanf(xz / sqrtf(t));
            // double roll = 0;

            // if (t != 0)
            // {
            //     roll = atan2f(yz, t1 - t0);
            // }
            // else
            // {
            //     roll = 2.f * atan2f(x, w) - sgn(xz) * yaw;
            // }

            // cout << "Roll:";
            // cout << roll, 1;
            // cout << " Pitch:";
            // cout << pitch, 1;
            // cout << " Yaw:";
            // SERIAL_PORT.println(yaw, 1);

#ifndef QUAT_ANIMATION
            cout << " Q1:";
            cout << q1;
            cout << " Q2:";
            cout << q2;
            cout << " Q3:";
            cout << q3;
            // cout << " Accuracy:";
            // cout << data.Quat9.Data.Accuracy << endl;
#else
            // Output the Quaternion data in the format expected by ZaneL's Node.js Quaternion animation tool
            cout << "{\"quat_w\":";
            cout << q0;
            cout << ", \"quat_x\":";
            cout << q1;
            cout << ", \"quat_y\":";
            cout << q2;
            cout << ", \"quat_z\":";
            cout << q3;
            cout << "}" << endl;
#endif
        }
    }

    if (myICM.status != ICM_20948_Stat_FIFOMoreDataAvail) // If more data is available then we should read it right away - and not delay
    {
        delay(10);
    }
}

/**************************
 * main function is used to recreate the behavior of the  Arduino defualt setup() and loop() functions
 **************************/
int main()
{
    setup();
    while (1)
    {
        loop();
    }
    return (0);
}