export default class common_motors
{
	constructor(tab, device)
	{
		this.id = device
		this.tab = tab
	}

	all_motors(obj, command)
	{
		for (column of document.querySelectorAll('.motor'))
			if (command == 'stop')
				motor_stop(column)
			else if (command == 'reset')
				motor_reset(column)
	}

	motor_reset(obj)
	{
		tab = obj.id.split('_')[0]
		device = obj.id.split('_')[1]
		send(obj, 'command', 'reset')
		.then((response) =>
		{
			if (document.getElementById(tab.id + '_' + device + '_ramp'))
				document.getElementById(tab.id + '_' + device + '_ramp').value = 0
			if (document.getElementById(tab.id + '_' + device + '_position_value'))
				document.getElementById(tab.id + '_' + device + '_position_value').innerText = 0
			if (document.getElementById(tab.id + '_' + device + '_speed_value'))
				document.getElementById(tab.id + '_' + device + '_speed_value').innerText = 0
			if (document.getElementById(tab.id + '_' + device + '_state_value'))
				document.getElementById(tab.id + '_' + device + '_state_value').innerText = ''
			if (document.getElementById(tab.id + '_' + device + '_speed_sp'))
				document.getElementById(tab.id + '_' + device + '_speed_sp').value = 0
			if (document.getElementById(tab.id + '_' + device + '_speed_sp_value'))
				document.getElementById(tab.id + '_' + device + '_speed_sp_value').innerText = 0
		})
	}

	motor_stop(obj)
	{
		send(obj, 'command', 'stop')
	}

	motor_run_forever(obj)
	{
		send(obj, 'command', 'run-forever')
	}

	motor_run_abs_pos(obj)
	{
		clicked_device = obj;
		tab = obj.id.split('_')[0]
		device = obj.id.split('_')[1]
		document.getElementById('position_input').value = document.getElementById(tab + '_' + device + '_position_value').innerText;
		document.getElementById('position_modal').classList.add('is-active'); 
		document.getElementById('position_input').select()
	}

	motor_run_rel_pos(obj)
	{
		clicked_device = obj;
		send(obj, 'position_sp', 0);
		document.getElementById('step_input').value = 0;
		document.getElementById('step_modal').classList.add('is-active');
		document.getElementById('step_input').select()
	}

	motor_run_timed(obj)
	{
		clicked_device = obj;
		send(obj, 'time_sp', 0);
		document.getElementById('time_input').value = 0;
		document.getElementById('time_modal').classList.add('is-active');
		document.getElementById('time_input').select()
	}

	motor_ramping_change(obj)
	{
		devices[devices.findIndex(device => device.id == obj.id.split('_')[1])].ramp_up_sp = obj.value
		send(obj, 'ramp_up_sp', obj.value);
		send(obj, 'ramp_down_sp', obj.value)
	}

	motor_speed_change(obj)
	{
		devices[devices.findIndex(device => device.id == obj.id.split('_')[1])].speed_sp = obj.value
		send(obj, 'speed_sp', obj.value);
	}

	motor_stopaction_change(obj)
	{
		devices[devices.findIndex(device => device.id == obj.id.split('_')[1])].stop_action = obj.value
		send(obj, 'stop_action', obj.value)
	}

	change_driver(obj, driver)
	{
		tab = get_tab_data(obj.id.split('_')[0])
		port_id = obj.id.split('_')[1]
		send(obj, 'change_driver', driver)
		.then(response => 
		{
			devices.splice(devices.findIndex(device => device.port === parseInt(port_id.substr(4)) - 4), 1)
			if (response.new_device.driver_name)
			{
				devices.push(response.new_device)
				load_html(tab.url, response.new_device.driver_name)
				.then(() => 
				{	
					load_scripts(tab.url, response.new_device.driver_name)
					.then(() => 
					{
						document.querySelectorAll('#' + tab.id + '_motors_columns > .column')[response.new_device.port || port_id.substring(4)-4].outerHTML = templates[response.new_device.driver_name || 'no-motor'].replace(/{{TAB_ID}}/g, tab.id).replace(/{{DEVICE_ID}}/g, response.new_device.id).replace(/{{PORT_NUMBER}}/g, response.new_device.port + 4)
						if (window[response.new_device.driver_name + '_init'])
							window[response.new_device.driver_name + '_init'](tab, devices.find(device => device.id == response.new_device.id))
					})
				})
			}
			else
				document.querySelectorAll('#' + tab.id + '_motors_columns > .column')[port_id.substring(4)-4].outerHTML = templates['no-motor'].replace(/{{TAB_ID}}/g, tab.id).replace(/{{PORT_NUMBER}}/g, port_id.substring(4)).replace(/{{PORT_NAME}}/g, String.fromCharCode(61 + parseInt(port_id.substring(4))))
		})
	}

	change_driver_dropdown(obj)
	{
		if (obj.classList.contains('is-active'))
			return obj.classList.remove('is-active')

		obj.querySelector('div:nth-of-type(2) > div').innerHTML = '';
		options = 
		[
			{value:'auto', text: "AUTO DETECT"},
			{value:'lego-ev3-l-motor', text: "LEGO EV3 L"},
			{value:'lego-ev3-m-motor', text: "LEGO EV3 M"},
			{value:'act-l12-ev3-100', text: "L12 100mm"},
			{value:'dc-motor', text: "LEGO DC MOTOR"},
		]
		for (option of options)
		{
			a = document.createElement('a')
			a.value = option.value;
			a.onclick = function() {change_driver(this.parentNode, this.value)}
			a.className = 'dropdown-item'
			a.innerText = option.text
			obj.querySelector('div:nth-of-type(2) > div').appendChild(a)
			obj.classList.add('is-active')
		}
	}
}