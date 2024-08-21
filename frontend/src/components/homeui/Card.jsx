import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 275,
  background: `
    linear-gradient(-225deg, #7DE2FC 0%, #B9B6E5 100%)
  `,
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06)',
  borderRadius: '16px',
  overflow: 'hidden',
  padding: '24px',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.18), 0 8px 16px rgba(0, 0, 0, 0.09)',
  },
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '1.1rem',
  fontWeight: 600,
  marginBottom: '12px',
  letterSpacing: '0.5px',
}));

const ContentTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto, Arial, sans-serif',
  '&.count': {
    fontSize: '1.8rem',
    fontWeight: 300,
    marginBottom: '8px',

  },
  '&.sum': {
    fontSize: '1.8rem',
    fontWeight: 300,
  },
}));

function CardComp({ transactions, month, year, name, width }) {
  transactions = transactions.filter(transaction => {
    const date = new Date(transaction.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });

  let sum = transactions.reduce((acc, transaction) => acc + Number(transaction.amount), 0);

  return (
    <StyledCard variant="outlined" sx={{ width: width }}>
      <CardContent>
        <TitleTypography gutterBottom>
          {name}
        </TitleTypography>
        <ContentTypography className="count" component="div">
          Number of {name}s is {transactions.length}
        </ContentTypography>
        <ContentTypography className="sum" component="div">
          Amount is ${sum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </ContentTypography>
      </CardContent>
    </StyledCard>
  );
}

export default CardComp;
