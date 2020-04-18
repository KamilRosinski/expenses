package expenses.server.logic;

import expenses.server.rest.dto.AccountingPeriodDTO;
import expenses.server.rest.dto.AccountingPeriodOverviewDTO;
import expenses.server.rest.dto.TransactionCategoryDTO;
import expenses.server.rest.dto.TransactionDTO;

import java.time.YearMonth;
import java.util.List;

public interface AccountingPeriodService {

	List<AccountingPeriodOverviewDTO> getOverviews();

	AccountingPeriodDTO getById(Long id);

	AccountingPeriodDTO createForYearMonth(YearMonth yearMonth);

	TransactionDTO createTransaction(Long accountingPeriodId, TransactionDTO transaction);

	List<TransactionCategoryDTO> getTransactionCategories();

}
