const API_URL = 'http://localhost:3000';

async function run() {
  try {
    const timestamp = Date.now();
    const email = `test${timestamp}@example.com`;
    const password = 'password123';

    console.log(`1. Registering user: ${email}`);
    const regRes = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name: 'Test User' }),
    });

    if (!regRes.ok) {
      const text = await regRes.text();
      throw new Error(`Register failed: ${regRes.status} ${text}`);
    }
    console.log('   Registration successful');

    console.log('2. Logging in');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!loginRes.ok) {
      const text = await loginRes.text();
      throw new Error(`Login failed: ${loginRes.status} ${text}`);
    }

    const loginData = await loginRes.json();
    const token = loginData.access_token;
    console.log('   Login successful, token received');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    console.log('3. Testing GET /tasks');
    const getRes = await fetch(`${API_URL}/tasks`, { headers });
    console.log('   GET /tasks status:', getRes.status);
    if (getRes.ok) {
      console.log('   GET /tasks successful', await getRes.json());
    } else {
      console.error('   GET /tasks failed', getRes.status);
    }

    console.log('4. Testing POST /tasks');
    const taskData = {
      id: '123e4567-e89b-12d3-a456-426614174000', // Valid UUID
      title: 'Test Task',
      dueDate: new Date().toISOString(),
      description: 'Created via debug script',
      status: 'pending',
    };
    const taskRes = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers,
      body: JSON.stringify(taskData),
    });

    if (!taskRes.ok) {
      const text = await taskRes.text();
      console.error('FAILED POST /tasks:', taskRes.status, text);
    } else {
      const data = await taskRes.json();
      console.log('   POST /tasks successful', data);
    }

    console.log('4. Testing POST /tasks/ai');
    const aiInput = { input: 'Buy milk tomorrow' };
    const aiRes = await fetch(`${API_URL}/tasks/ai`, {
      method: 'POST',
      headers,
      body: JSON.stringify(aiInput),
    });

    if (!aiRes.ok) {
      const text = await aiRes.text();
      console.error('FAILED POST /tasks/ai:', aiRes.status, text);
    } else {
      const data = await aiRes.json();
      console.log('   POST /tasks/ai successful', data);
    }

    console.log('6. Verifying Persistence (GET /tasks)');
    const finalGetRes = await fetch(`${API_URL}/tasks`, { headers });
    if (finalGetRes.ok) {
      const tasks = await finalGetRes.json();
      console.log('   Final GET /tasks count:', tasks.length);
      console.log('   Tasks:', JSON.stringify(tasks, null, 2));
    } else {
      console.error('   Final GET /tasks failed', finalGetRes.status);
    }
  } catch (error: any) {
    console.error('SCRIPT ERROR:', error);
  }
}

run();
