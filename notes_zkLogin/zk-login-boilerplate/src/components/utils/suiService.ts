import  { SUI_CLIENT }  from  './suiClient';

export const SUI_SERVICE = {
    async getFormattedBalance (owner: string) {
        const balance = await SUI_CLIENT.getBalance({
            owner: owner,
        });
        return Number(Number(balance.totalBalance) / 1000_000_000).toFixed(2);
    }
};