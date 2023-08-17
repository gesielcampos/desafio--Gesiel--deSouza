class CaixaDaLanchonete {
   
    calcularValorDaCompra(metodoDePagamento, itens) {

        const cardapio = [
            { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
            { codigo: 'chantilly', descricao: 'Chantily (extra do Café)', valor: 1.50 },
            { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
            { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
            { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
            { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
        ];

        const formasDePagamentoValidas = ['dinheiro', 'debito', 'credito'];

        if (!formasDePagamentoValidas.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }        

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        // Verificar se apenas os combos estão presentes
        const combos = ['combo1', 'combo2'];
        const contemApenasCombos = itens.every(item => combos.includes(item.split(',')[0]));

        if (contemApenasCombos) {
            return "Combos não são considerados como item principal.";
        }
        
        let valorTotal = 0;
        const itensPrincipais = new Set();

        // Percorra os itens do pedido
        for (const itemPedido of itens) {
            const [codigo, quantidade] = itemPedido.split(',');
            const itemCardapio = cardapio.find(item => item.codigo === codigo);

            if (!itemCardapio) {
                return "Item inválido!";
            }

            if (quantidade <= 0)  {
                return "Quantidade inválida!";
            }
            
            valorTotal += itemCardapio.valor * parseInt(quantidade);

            if (!itemCardapio.descricao.includes('extra')) {
                itensPrincipais.add(codigo);
            }    
            
            /*
            // Verificar se todos os extras têm o respectivo item principal
            if (itemCardapio && itemCardapio.descricao.includes('extra')) {
                const itemPrincipalCodigo = itemCardapio.codigo.replace('extra-', '');
        
                if (!itensPrincipais.has(itemPrincipalCodigo) && !combos.includes(itemPrincipalCodigo)) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }
            */
        }        
    
        // Aplicar ajustes com base na forma de pagamento
        if (metodoDePagamento === 'dinheiro') {
            valorTotal *= 0.95; // Aplicar desconto de 5% (0.95 = 100% - 5%)
        } else if (metodoDePagamento === 'credito') {
            valorTotal *= 1.03; // Aplicar acréscimo de 3% (1.03 = 100% + 3%)
        }
        const valorFormatado = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;

        if (valorTotal === 0) {
            return "Não há itens principais no carrinho de compra!";
        }else
            return valorFormatado;
    }    
}

export { CaixaDaLanchonete };
