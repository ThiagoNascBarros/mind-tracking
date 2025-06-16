import banco from '../config/database.js';

// Função para contar os questionários respondidos por um usuário
export async function contarQuestionarios(req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'ID do usuário é obrigatório'
        });
    }

    try {
        // Conta os questionários iniciais respondidos
        const { rows: questionariosIniciais } = await banco.query(
            'SELECT COUNT(*) FROM respostas_questionario_inicial WHERE usuario_id = $1',
            [id]
        );

        // Conta os questionários diários respondidos
        const { rows: questionariosDiarios } = await banco.query(
            'SELECT COUNT(*) FROM respostas_questionario_diario WHERE usuario_id = $1',
            [id]
        );

        const contagemTotal = parseInt(questionariosIniciais[0].count) + parseInt(questionariosDiarios[0].count);

        return res.status(200).json({
            success: true,
            contagem: contagemTotal
        });

    } catch (error) {
        console.error('Erro ao contar questionários:', error);
        return res.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao contar os questionários. Por favor, tente novamente mais tarde.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
} 