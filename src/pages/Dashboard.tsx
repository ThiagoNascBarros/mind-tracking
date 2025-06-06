import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Header from '../components/Header';
import Footer from '../components/Footer/Footer';
import smiley from '../../public/Assets/IconSmile.svg';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  const data = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Avaliação de Humor Diária',
        data: [6, 7.5, 5, 8, 6, 7, 9],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'Gráfico de Bem-estar',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
          color: '#8E8999', // Match text color from image
        },
        grid: {
          color: '#ffffff20', // Match grid color from image
        },
      },
      x: {
        ticks: {
          color: '#8E8999', // Match text color from image
        },
        grid: {
          color: '#ffffff20', // Match grid color from image
        },
      },
    },
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-bl from-[#03061B] via-[#0F1526] to-[#0F1A3D] pb-16">
        <section className='flex flex-col px-[1em] md:px-[12em]'>
          <h1 className='text-white text-2xl md:text-4xl font-bold mt-10 md:mt-14 text-left md:text-left'>Desempenho dos últimos questionários</h1>
          <div className='flex flex-col w-full sm:h-[36em] md:h-[32em] lg:h-[34em] gap-4 mt-5 bg-[#161D2D] border-2 border-[#ffffff20] rounded-lg p-4 md:px-8 md:py-5'>
            <div className='flex flex-col gap-2'>
              <div className="flex items-center gap-2">
                <h2 className="text-white text-2xl md:text-3xl font-semibold">Gráfico de Bem-estar</h2>
              </div>
              <p className="text-[#8E8999] text-sm">Suas avaliações diárias de humor.</p>
            </div>

            {/* Chart area */}
            <div className="flex-grow">
              <Line data={data} options={options} />
            </div>
          </div>
          <div className="p-4 md:p-8 lg:p-12 bg-[#161D2D] border-2 border-[#ffffff20] rounded-lg mt-5">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">Principais Observações</h1>
            <p className="text-sm md:text-base text-[#E5E7EB] mb-8">Destaques e conselhos práticos baseados nos seus dados.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Flutuações de Humor */}
              <div className="bg-[#1A202C] p-6 rounded-md flex items-start space-x-4 border border-[#2D3748] shadow-lg">
                <div className="text-blue-500 text-2xl flex-shrink-0">
                  {/* Ícone Check Azul */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Flutuações de Humor</h3>
                  <p className="text-sm text-[#E5E7EB]">Seu humor apresentou alguns altos e baixos esta semana. Considere explorar o que pode ter influenciado essas mudanças.</p>
                </div>
              </div>

              {/* Card 2: Engajamento em Atividades */}
              <div className="bg-[#1A202C] p-6 rounded-md flex items-start space-x-4 border border-[#2D3748] shadow-lg">
                <div className="text-green-500 text-2xl flex-shrink-0">
                   {/* Ícone Check Verde */}
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                   </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Engajamento em Atividades</h3>
                  <p className="text-sm text-[#E5E7EB]">Você registrou atividades prazerosas em vários dias. Continue assim!</p>
                </div>
              </div>

              {/* Card 3: Consistência do Sono */}
              <div className="bg-[#1A202C] p-6 rounded-md flex items-start space-x-4 border border-[#2D3748] shadow-lg">
                <div className="text-yellow-500 text-2xl flex-shrink-0">
                   {/* Ícone Check Amarelo */}
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                   </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Consistência do Sono</h3>
                  <p className="text-sm text-[#E5E7EB]">A qualidade do sono variou. Tentar um horário de sono mais regular pode ser benéfico.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;