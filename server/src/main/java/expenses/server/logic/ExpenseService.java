package expenses.server.logic;

import expenses.server.rest.dto.CategoryWithSubcategoriesDTO;
import expenses.server.rest.dto.MonthDTO;
import expenses.server.rest.dto.MonthOverviewDTO;
import expenses.server.rest.dto.PredictionDTO;
import expenses.server.rest.dto.TransactionDTO;
import expenses.server.rest.dto.YearMonthDTO;

import java.util.List;

public interface ExpenseService {

	List<MonthOverviewDTO> getMonthOverviews();

	MonthDTO getMonthById(Long id);

	MonthDTO createMonth(YearMonthDTO yearMonth);

	List<CategoryWithSubcategoriesDTO> getCategoriesWithSubcategories();

	TransactionDTO createTransaction(Long monthId, TransactionDTO transaction);

	PredictionDTO createPrediction(Long monthId, PredictionDTO prediction);

}
