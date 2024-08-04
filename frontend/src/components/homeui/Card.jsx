import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 275,
  background: `
    radial-gradient(circle at 10% 20%, rgba(255, 0, 0, 0.1) 0%, rgba(255, 0, 0, 0) 50%),
    radial-gradient(circle at 90% 80%, rgba(0, 0, 255, 0.1) 0%, rgba(0, 0, 255, 0) 50%),
    linear-gradient(135deg, #ffffff 0%, #f5f8ff 100%)
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
  fontFamily: 'Arial, sans-serif',
  fontSize: '1.1rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: '12px',
  letterSpacing: '0.5px',
}));

const ContentTypography = styled(Typography)(({ theme }) => ({
  fontFamily: 'Helvetica, Arial, sans-serif',
  '&.count': {
    fontSize: '1.8rem',
    fontWeight: 300,
    color: theme.palette.primary.main,
    marginBottom: '8px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  },
  '&.sum': {
    fontSize: '1.8rem',
    fontWeight: 300,
    color: theme.palette.secondary.main,
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
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