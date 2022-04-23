const config = 
{
	"ev3":
	[
		{
			"friendly_name": "EV3DEV1",
			"server": "https://ev3dev1.brickfactor.net:20001"
		}
	],
	"motors":
	[
		{
			"friendly_name": null,
			"image": null,
			"default_driver": "act-l12-ev3-100"
		},
		{
			"friendly_name": null,
			"image": null,
			"default_ramp_up_sp": 2000,
			"default_ramp_down_sp": 2000,
			"default_speed_sp": 500,
			"default_time_sp": 10000
		},
		{
			"friendly_name": null,
			"image": null
		},
		{
			"friendly_name": null,
			"image": null
		}
	],
	"sensors":
	[
		{
			"friendly_name": "Touch Sensor",
			"image": null
		},
		{
			"friendly_name": "Color Sensor",
			"image": null
		},
		{
			"friendly_name": null,
			"image": null
		},
		{
			"friendly_name": "IR Sensor",
			"image": null
		}
	],
	"usbports":
	[
		{
			"friendly_name": "WIFI",
			"image": "images/wifi-dongle.png",
			"toggle_path": "/sys/bus/usb/devices/1-1:1.0/1-1-port3/power/pm_qos_no_power_off",
			"readonly": 1,
			"driver_name": "usb-amazon-HU9002V1EBL"
		},
		{
			"friendly_name": "Haunted Manor",
			"image": "images/haunted-manor-lights.png",
			"toggle_path": "/sys/bus/usb/devices/1-1:1.0/1-1-port2/power/pm_qos_no_power_off",
			"driver_name": "usb-amazon-HU9002V1EBL"
		},
		{
			"friendly_name": "Haunted House",
			"image": "images/haunted-house-lights.png",
			"toggle_path": "/sys/bus/usb/devices/1-1:1.0/1-1-port1/power/pm_qos_no_power_off",
			"driver_name": "usb-amazon-HU9002V1EBL"
		},
		{
			"friendly_name": "Roller Coaster",
			"image": "images/rollercoaster-lights.png",
			"toggle_path": "/sys/bus/usb/devices/1-1.4:1.0/1-1.4-port3/power/pm_qos_no_power_off",
			"driver_name": "usb-amazon-HU9002V1EBL"
		},
		{
			"friendly_name": "Disney Castle",
			"image": "images/disney-castle-lights.png",
			"toggle_path": "/sys/bus/usb/devices/1-1.4:1.0/1-1.4-port2/power/pm_qos_no_power_off",
			"driver_name": "usb-amazon-HU9002V1EBL"
		},
		{
			"friendly_name": "Barracuda Bay",
			"image": "images/barracuda-bay-lights.png",
			"toggle_path": "/sys/bus/usb/devices/1-1.4:1.0/1-1.4-port1/power/pm_qos_no_power_off",
			"driver_name": "usb-amazon-HU9002V1EBL"
		},
		{
			"friendly_name": "Disney Train",
			"image": "images/disney-train-lights.png",
			"toggle_path": "/sys/bus/usb/devices/1-1.4.4:1.0/1-1.4.4-port3/power/pm_qos_no_power_off",
			"driver_name": "usb-amazon-HU9002V1EBL"
		},
		{
			"friendly_name": "Joker Manor",
			"image": "images/joker-manor-lights.png",
			"toggle_path": "/sys/bus/usb/devices/1-1.4.4:1.0/1-1.4.4-port2/power/pm_qos_no_power_off",
			"driver_name": "usb-amazon-HU9002V1EBL"
		},
		{
			"friendly_name": "Carrousel",
			"image": "images/carrousel-lights.png",
			"toggle_path": "/sys/bus/usb/devices/1-1.4.4:1.0/1-1.4.4-port1/power/pm_qos_no_power_off",
			"driver_name": "usb-amazon-HU9002V1EBL"
		},
		{
			"friendly_name": "Ferry Wheel",
			"image": "images/ferry-wheel-lights.png",
			"toggle_path": "/sys/bus/usb/devices/1-1.4.4:1.0/1-1.4.4-port4/power/pm_qos_no_power_off",
			"driver_name": "usb-amazon-HU9002V1EBL"
		}
	],
	"leds":
	[
		{
			"friendly_name": "Left Green"
		},
		{
			"friendly_name": "Left Red"
		},
		{
			"friendly_name": "Right Green"
		},
		{
			"friendly_name": "Right Red"
		}
	]
}
