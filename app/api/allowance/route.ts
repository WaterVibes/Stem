import { NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const erc20ABI = [
  {
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const owner = searchParams.get('owner');
  const spender = searchParams.get('spender');

  if (!token || !owner || !spender) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  try {
    const allowance = await client.readContract({
      address: token as `0x${string}`,
      abi: erc20ABI,
      functionName: 'allowance',
      args: [owner as `0x${string}`, spender as `0x${string}`],
    });

    return NextResponse.json({ allowance: allowance.toString() });
  } catch (error) {
    console.error('Error checking allowance:', error);
    return NextResponse.json(
      { error: 'Failed to check allowance' },
      { status: 500 }
    );
  }
} 